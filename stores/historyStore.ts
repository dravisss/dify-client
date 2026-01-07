import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type CompletionStatus = 'empty' | 'partial' | 'complete'

export interface HistorySession {
  id: string
  canvasId: string
  conversationId: string | null
  title: string
  createdAt: Date
  updatedAt: Date
  status: 'draft' | 'in_progress' | 'completed'
  completionProgress: {
    situacao: CompletionStatus
    evidencias: CompletionStatus
    intervencao: CompletionStatus
  }
}

interface HistoryStore {
  sessions: HistorySession[]

  // Actions
  addSession: (session: Omit<HistorySession, 'id' | 'createdAt' | 'updatedAt'>) => string
  updateSession: (id: string, updates: Partial<HistorySession>) => void
  deleteSession: (id: string) => void
  getSession: (id: string) => HistorySession | undefined

  // Helpers
  getSessionsByDate: () => Map<string, HistorySession[]>
  getRecentSessions: (limit?: number) => HistorySession[]
}

// Helper to format date as group key
const getDateKey = (date: Date): string => {
  const now = new Date()
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))

  if (diffDays === 0) { return 'Hoje' }
  if (diffDays === 1) { return 'Ontem' }
  if (diffDays <= 7) { return 'Esta semana' }
  if (diffDays <= 14) { return 'Semana passada' }
  if (diffDays <= 30) { return 'Este mês' }
  return 'Mais antigos'
}

export const useHistoryStore = create<HistoryStore>()(
  persist(
    (set, get) => ({
      sessions: [],

      addSession: (sessionData) => {
        const id = `session-${Date.now()}`
        const now = new Date()
        const newSession: HistorySession = {
          ...sessionData,
          id,
          createdAt: now,
          updatedAt: now,
        }

        set(state => ({
          sessions: [newSession, ...state.sessions],
        }))

        return id
      },

      updateSession: (id: string, updates: Partial<HistorySession>) => {
        set(state => ({
          sessions: state.sessions.map(session =>
            session.id === id
              ? { ...session, ...updates, updatedAt: new Date() }
              : session,
          ),
        }))
      },

      deleteSession: (id: string) => {
        set(state => ({
          sessions: state.sessions.filter(session => session.id !== id),
        }))
      },

      getSession: (id: string) => {
        return get().sessions.find(session => session.id === id)
      },

      getSessionsByDate: () => {
        const sessions = get().sessions
        const grouped = new Map<string, HistorySession[]>()

        // Sort by updatedAt descending
        const sorted = [...sessions].sort(
          (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
        )

        for (const session of sorted) {
          const key = getDateKey(new Date(session.updatedAt))
          const existing = grouped.get(key) || []
          grouped.set(key, [...existing, session])
        }

        return grouped
      },

      getRecentSessions: (limit = 10) => {
        return [...get().sessions]
          .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
          .slice(0, limit)
      },
    }),
    {
      name: 'co-piloto-history',
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
