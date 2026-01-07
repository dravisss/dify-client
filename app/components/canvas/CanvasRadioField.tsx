'use client'

import type { FC } from 'react'
import React from 'react'
import cn from 'classnames'

interface RadioOption {
  value: string
  label: string
  emoji?: string
}

interface CanvasRadioFieldProps {
  id: string
  label: string
  options: RadioOption[]
  value: string | null
  source: 'manual' | 'ai'
  onChange: (value: string) => void
  pendingSuggestion?: string
  onAcceptSuggestion?: () => void
  onRejectSuggestion?: () => void
  className?: string
}

const CanvasRadioField: FC<CanvasRadioFieldProps> = ({
  id,
  label,
  options,
  value,
  source,
  onChange,
  pendingSuggestion,
  onAcceptSuggestion,
  onRejectSuggestion,
  className,
}) => {
  // Determine if the suggestion matches one of the options
  const matchingOption = options.find(opt =>
    pendingSuggestion?.toLowerCase().includes(opt.value.toLowerCase())
    || pendingSuggestion?.toLowerCase().includes(opt.label.toLowerCase()),
  )

  return (
    <div className={cn('space-y-3', className)}>
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        {value && source === 'ai' && (
          <span className="text-[#4b8c99] text-xs">🤖</span>
        )}
      </div>

      <div className="space-y-2">
        {options.map((option) => {
          const isSuggested = matchingOption?.value === option.value
          return (
            <label
              key={option.value}
              className={cn(
                'flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer relative',
                'transition-all duration-200',
                value === option.value
                  ? 'border-[#4b8c99] bg-[#4b8c99]/5'
                  : isSuggested
                    ? 'border-[#4b8c99] border-dashed bg-[#4b8c99]/5 ring-1 ring-[#4b8c99]'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50',
              )}
            >
              <input
                type="radio"
                name={id}
                value={option.value}
                checked={value === option.value}
                onChange={e => onChange(e.target.value)}
                className="sr-only"
              />
              <div
                className={cn(
                  'w-4 h-4 rounded-full border-2 flex items-center justify-center',
                  'transition-colors duration-200',
                  value === option.value
                    ? 'border-[#4b8c99] bg-[#4b8c99]'
                    : 'border-gray-300',
                )}
              >
                {value === option.value && (
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                )}
              </div>
              <span className="text-sm text-gray-700 flex-1">
                {option.emoji && <span className="mr-1">{option.emoji}</span>}
                {option.label}
              </span>

              {isSuggested && (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#4b8c99] font-bold bg-white px-2 py-0.5 rounded border border-[#4b8c99]">
                    Sugestão IA
                  </span>
                  {onAcceptSuggestion && (
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation() // Prevent radio select
                        onAcceptSuggestion()
                      }}
                      className="p-1 hover:bg-[#4b8c99]/20 rounded-full text-[#4b8c99]"
                      title="Aceitar Sugestão"
                    >
                      ✅
                    </button>
                  )}
                </div>
              )}
            </label>
          )
        })}
      </div>

      {/* Fallback AI Suggestion (if no option matches or explicitly rejected/ignored) */}
      {pendingSuggestion && !matchingOption && (
        <div className="bg-[#4b8c99]/5 border border-[#4b8c99]/20 rounded-lg p-3 space-y-2 mt-2">
          <div className="flex items-start gap-2">
            <span className="text-lg">🤖</span>
            <div className="flex-1 space-y-1">
              <p className="text-xs font-semibold text-[#4b8c99]">Sugestão da IA:</p>
              <p className="text-sm text-gray-700 whitespace-pre-wrap">{pendingSuggestion}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={onAcceptSuggestion}
              className="flex-1 py-1.5 px-3 bg-[#4b8c99] text-white text-xs font-medium rounded-md hover:bg-[#3d7580] transition-colors"
            >
              ✅ Aceitar
            </button>
            <button
              onClick={onRejectSuggestion}
              className="flex-1 py-1.5 px-3 bg-gray-100 text-gray-700 text-xs font-medium rounded-md hover:bg-gray-200 transition-colors"
            >
              ❌ Rejeitar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default React.memo(CanvasRadioField)

// Preset options
export const problemTypeOptions: RadioOption[] = [
  { value: 'claro', label: 'Claro (Já tem solução conhecida)' },
  { value: 'complicado', label: 'Complicado (Precisa de especialista)' },
  { value: 'complexo', label: 'Complexo (Ninguém sabe a causa)' },
  { value: 'caotico', label: 'Caótico (Crise em andamento)' },
]

export const autonomyOptions: RadioOption[] = [
  { value: 'transmitir', label: 'Transmitir (Tenho autoridade)', emoji: '🟢' },
  { value: 'negociar', label: 'Negociar (Preciso de aprovação)', emoji: '🟡' },
  { value: 'amplificar', label: 'Amplificar (Fora do meu alcance)', emoji: '🔴' },
]
