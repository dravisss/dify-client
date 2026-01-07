import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Field types matching the spec
export interface TextField {
  value: string
  source: 'manual' | 'ai'
  validated: boolean
  updatedAt: Date
}

export interface ListField {
  items: Array<{ value: string, source: 'manual' | 'ai' }>
}

export interface RadioField {
  value: string | null
  source: 'manual' | 'ai'
}

// Canvas state structure
export interface CanvasState {
  id: string
  conversationId: string
  createdAt: Date
  updatedAt: Date
  title: string
  status: 'draft' | 'in_progress' | 'completed'

  situacao: {
    cena: TextField
    impacto: TextField
  }

  evidencias: {
    dados: TextField
    hipoteses: ListField
    tipo_problema: RadioField
  }

  intervencao: {
    acao: TextField
    autonomia: RadioField
    proximo_passo: TextField
  }
}

export interface PendingSuggestion {
  field: string
  value: string
}

// Helper to create empty text field
const createEmptyTextField = (): TextField => ({
  value: '',
  source: 'manual',
  validated: false,
  updatedAt: new Date(),
})

// Helper to create empty radio field
const createEmptyRadioField = (): RadioField => ({
  value: null,
  source: 'manual',
})

// Helper to create empty canvas for a conversation
const createEmptyCanvas = (conversationId: string): CanvasState => ({
  id: `canvas-${Date.now()}`,
  conversationId,
  createdAt: new Date(),
  updatedAt: new Date(),
  title: 'Novo Problema',
  status: 'draft',
  situacao: {
    cena: createEmptyTextField(),
    impacto: createEmptyTextField(),
  },
  evidencias: {
    dados: createEmptyTextField(),
    hipoteses: { items: [] },
    tipo_problema: createEmptyRadioField(),
  },
  intervencao: {
    acao: createEmptyTextField(),
    autonomia: createEmptyRadioField(),
    proximo_passo: createEmptyTextField(),
  },
})

interface CanvasStore {
  // Canvas storage: one canvas per conversation
  canvasByConversation: Record<string, CanvasState>
  currentConversationId: string | null
  pendingSuggestions: PendingSuggestion[]

  // Actions
  setCurrentConversation: (conversationId: string) => void
  getOrCreateCanvas: (conversationId: string) => CanvasState
  getCurrentCanvas: () => CanvasState | null
  updateField: (path: string, value: string, source: 'manual' | 'ai') => void
  validateField: (path: string) => void
  addSuggestion: (field: string, value: string) => void
  acceptSuggestion: (field: string) => void
  rejectSuggestion: (field: string) => void
  resetCanvas: () => void
  setTitle: (title: string) => void

  // List field actions
  addHypothesis: (value: string, source?: 'manual' | 'ai') => void
  removeHypothesis: (index: number) => void
  updateHypothesis: (index: number, value: string) => void

  // Computed helpers
  getCanvasContextForDify: () => string | null
  hasAnyContent: () => boolean
  getCompletionStatus: () => {
    situacao: number
    evidencias: number
    intervencao: number
    total: number
  }
}

// Helper to set nested value
const setNestedValue = (obj: any, path: string, value: any): any => {
  const keys = path.split('.')
  const result = { ...obj }
  let current = result

  for (let i = 0; i < keys.length - 1; i++) {
    current[keys[i]] = { ...current[keys[i]] }
    current = current[keys[i]]
  }

  current[keys[keys.length - 1]] = value
  return result
}

export const useCanvasStore = create<CanvasStore>()(
  persist(
    (set, get) => ({
      canvasByConversation: {},
      currentConversationId: null,
      pendingSuggestions: [],

      setCurrentConversation: (conversationId: string, shouldClearSuggestions = true) => {
        set(state => ({
          currentConversationId: conversationId,
          pendingSuggestions: shouldClearSuggestions ? [] : state.pendingSuggestions,
        }))
        // Ensure canvas exists for this conversation
        get().getOrCreateCanvas(conversationId)
      },

      getOrCreateCanvas: (conversationId: string) => {
        const existing = get().canvasByConversation[conversationId]
        if (existing) { return existing }

        const newCanvas = createEmptyCanvas(conversationId)
        set(state => ({
          canvasByConversation: {
            ...state.canvasByConversation,
            [conversationId]: newCanvas,
          },
        }))
        return newCanvas
      },

      getCurrentCanvas: () => {
        const convId = get().currentConversationId
        if (!convId) { return null }
        return get().canvasByConversation[convId] || null
      },

      updateField: (path: string, value: string, source: 'manual' | 'ai') => {
        const convId = get().currentConversationId
        if (!convId) { return }

        const canvas = get().canvasByConversation[convId]
        if (!canvas) { return }

        const fieldPath = path.includes('.') ? path : path
        const keys = fieldPath.split('.')

        // Determine if it's a text field or radio field based on the path
        const isRadioField = ['tipo_problema', 'autonomia'].includes(keys[keys.length - 1])

        const newValue = isRadioField
          ? { value, source }
          : { value, source, validated: false, updatedAt: new Date() }

        const updatedCanvas = setNestedValue(canvas, fieldPath, newValue)
        updatedCanvas.updatedAt = new Date()
        updatedCanvas.status = 'in_progress'

        set(state => ({
          canvasByConversation: {
            ...state.canvasByConversation,
            [convId]: updatedCanvas,
          },
        }))
      },

      validateField: (path: string) => {
        const convId = get().currentConversationId
        if (!convId) { return }

        const canvas = get().canvasByConversation[convId]
        if (!canvas) { return }

        const keys = path.split('.')
        const currentField = keys.reduce((obj, key) => obj?.[key], canvas as any)

        if (currentField && typeof currentField === 'object' && 'validated' in currentField) {
          const updatedField = { ...currentField, validated: true }
          const updatedCanvas = setNestedValue(canvas, path, updatedField)
          set(state => ({
            canvasByConversation: {
              ...state.canvasByConversation,
              [convId]: updatedCanvas,
            },
          }))
        }
      },

      addSuggestion: (field: string, value: string) => {
        set(state => ({
          pendingSuggestions: [
            ...state.pendingSuggestions.filter(s => s.field !== field),
            { field, value },
          ],
        }))
      },

      acceptSuggestion: (field: string) => {
        const suggestion = get().pendingSuggestions.find(s => s.field === field)
        if (suggestion) {
          // Special handling for list fields (like hipoteses)
          if (field.includes('hipoteses')) {
            // Split by newlines or numbered lists
            const items = suggestion.value
              .split(/\n|(?:\d+\.\s+)|(?:-\s+)/) // Split by newline, "1. ", or "- "
              .map(s => s.replace(/\*\*/g, '').trim()) // Remove markdown bold
              .filter(s => s.length > 0)

            // Add each item
            items.forEach((item) => {
              get().addHypothesis(item, 'ai')
            })
          } else {
            // Standard field update
            get().updateField(field, suggestion.value, 'ai')
          }

          set(state => ({
            pendingSuggestions: state.pendingSuggestions.filter(s => s.field !== field),
          }))
        }
      },

      rejectSuggestion: (field: string) => {
        set(state => ({
          pendingSuggestions: state.pendingSuggestions.filter(s => s.field !== field),
        }))
      },

      resetCanvas: () => {
        const convId = get().currentConversationId
        if (!convId) { return }

        set(state => ({
          canvasByConversation: {
            ...state.canvasByConversation,
            [convId]: createEmptyCanvas(convId),
          },
          pendingSuggestions: [],
        }))
      },

      setTitle: (title: string) => {
        const convId = get().currentConversationId
        if (!convId) { return }

        const canvas = get().canvasByConversation[convId]
        if (!canvas) { return }

        set(state => ({
          canvasByConversation: {
            ...state.canvasByConversation,
            [convId]: { ...canvas, title, updatedAt: new Date() },
          },
        }))
      },

      addHypothesis: (value: string, source: 'manual' | 'ai' = 'manual') => {
        const convId = get().currentConversationId
        if (!convId) { return }

        const canvas = get().canvasByConversation[convId]
        if (!canvas) { return }
        if (canvas.evidencias.hipoteses.items.length >= 4) { return } // Max 4 items

        set(state => ({
          canvasByConversation: {
            ...state.canvasByConversation,
            [convId]: {
              ...canvas,
              evidencias: {
                ...canvas.evidencias,
                hipoteses: {
                  items: [...canvas.evidencias.hipoteses.items, { value, source }],
                },
              },
              updatedAt: new Date(),
            },
          },
        }))
      },

      removeHypothesis: (index: number) => {
        const convId = get().currentConversationId
        if (!convId) { return }

        const canvas = get().canvasByConversation[convId]
        if (!canvas) { return }

        set(state => ({
          canvasByConversation: {
            ...state.canvasByConversation,
            [convId]: {
              ...canvas,
              evidencias: {
                ...canvas.evidencias,
                hipoteses: {
                  items: canvas.evidencias.hipoteses.items.filter((_, i) => i !== index),
                },
              },
              updatedAt: new Date(),
            },
          },
        }))
      },

      updateHypothesis: (index: number, value: string) => {
        const convId = get().currentConversationId
        if (!convId) { return }

        const canvas = get().canvasByConversation[convId]
        if (!canvas) { return }

        const newItems = [...canvas.evidencias.hipoteses.items]
        if (newItems[index]) {
          newItems[index] = { ...newItems[index], value }
        }

        set(state => ({
          canvasByConversation: {
            ...state.canvasByConversation,
            [convId]: {
              ...canvas,
              evidencias: {
                ...canvas.evidencias,
                hipoteses: { items: newItems },
              },
              updatedAt: new Date(),
            },
          },
        }))
      },

      hasAnyContent: () => {
        const canvas = get().getCurrentCanvas()
        if (!canvas) { return false }

        return !!(
          canvas.situacao.cena.value
          || canvas.situacao.impacto.value
          || canvas.evidencias.dados.value
          || canvas.evidencias.hipoteses.items.length > 0
          || canvas.evidencias.tipo_problema.value
          || canvas.intervencao.acao.value
          || canvas.intervencao.autonomia.value
          || canvas.intervencao.proximo_passo.value
        )
      },

      getCanvasContextForDify: () => {
        const canvas = get().getCurrentCanvas()
        if (!canvas) { return null }

        // Only send context if there's actual content
        if (!get().hasAnyContent()) { return null }

        const hipotesesText = canvas.evidencias.hipoteses.items.length > 0
          ? canvas.evidencias.hipoteses.items.map((h, i) => `  ${i + 1}. ${h.value}`).join('\n')
          : '  (nenhuma)'

        return `
## CONTEXTO DO CANVAS (Estado Atual)

### SITUAÇÃO
- **A Cena:** ${canvas.situacao.cena.value || 'Não preenchido'}
- **O Impacto:** ${canvas.situacao.impacto.value || 'Não preenchido'}

### EVIDÊNCIAS
- **Dados/Provas:** ${canvas.evidencias.dados.value || 'Não preenchido'}
- **Hipóteses:**
${hipotesesText}
- **Tipo de Problema:** ${canvas.evidencias.tipo_problema.value || 'Não classificado'}

### INTERVENÇÃO
- **Ação Proposta:** ${canvas.intervencao.acao.value || 'Não preenchido'}
- **Autonomia:** ${canvas.intervencao.autonomia.value || 'Não definida'}
- **Próximo Passo:** ${canvas.intervencao.proximo_passo.value || 'Não definido'}
`.trim()
      },

      getCompletionStatus: () => {
        const canvas = get().getCurrentCanvas()
        if (!canvas) { return { situacao: 0, evidencias: 0, intervencao: 0, total: 0 } }

        // Calculate situacao completion (0-100)
        let situacaoFilled = 0
        if (canvas.situacao.cena.value) { situacaoFilled += 50 }
        if (canvas.situacao.impacto.value) { situacaoFilled += 50 }

        // Calculate evidencias completion (0-100)
        let evidenciasFilled = 0
        if (canvas.evidencias.dados.value) { evidenciasFilled += 40 }
        if (canvas.evidencias.hipoteses.items.length > 0) { evidenciasFilled += 30 }
        if (canvas.evidencias.tipo_problema.value) { evidenciasFilled += 30 }

        // Calculate intervencao completion (0-100)
        let intervencaoFilled = 0
        if (canvas.intervencao.acao.value) { intervencaoFilled += 40 }
        if (canvas.intervencao.autonomia.value) { intervencaoFilled += 30 }
        if (canvas.intervencao.proximo_passo.value) { intervencaoFilled += 30 }

        const total = Math.round((situacaoFilled + evidenciasFilled + intervencaoFilled) / 3)

        return {
          situacao: situacaoFilled,
          evidencias: evidenciasFilled,
          intervencao: intervencaoFilled,
          total,
        }
      },
    }),
    {
      name: 'co-piloto-canvas',
      // Custom serialization for Date objects
      serialize: state => JSON.stringify(state, (key, value) => {
        if (value instanceof Date) {
          return { __type: 'Date', value: value.toISOString() }
        }
        return value
      }),
      deserialize: str => JSON.parse(str, (key, value) => {
        if (value && typeof value === 'object' && value.__type === 'Date') {
          return new Date(value.value)
        }
        return value
      }),
    },
  ),
)
