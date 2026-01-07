'use client'

import type { FC } from 'react'
import React, { useState } from 'react'
import cn from 'classnames'

type FieldState = 'empty' | 'editing' | 'filled_manual' | 'filled_ai' | 'validated'

interface CanvasFieldProps {
  id: string
  label: string
  placeholder: string
  value: string
  source: 'manual' | 'ai'
  validated: boolean
  onChange: (value: string) => void
  onValidate?: () => void
  maxChars?: number
  type?: 'text' | 'textarea'
  pendingSuggestion?: string
  onAcceptSuggestion?: () => void
  onRejectSuggestion?: () => void
  className?: string
}

const CanvasField: FC<CanvasFieldProps> = ({
  id,
  label,
  placeholder,
  value,
  source,
  validated,
  onChange,
  onValidate,
  maxChars = 500,
  type = 'textarea',
  pendingSuggestion,
  onAcceptSuggestion,
  onRejectSuggestion,
  className,
}) => {
  const [isFocused, setIsFocused] = useState(false)

  const getFieldState = (): FieldState => {
    if (isFocused) { return 'editing' }
    if (validated) { return 'validated' }
    if (value && source === 'ai') { return 'filled_ai' }
    if (value && source === 'manual') { return 'filled_manual' }
    return 'empty'
  }

  const fieldState = getFieldState()

  const stateStyles: Record<FieldState, string> = {
    empty: 'border-gray-300',
    editing: 'border-[#4b8c99] ring-2 ring-[#4b8c99]/20',
    filled_manual: 'border-blue-400',
    filled_ai: 'border-[#4b8c99]',
    validated: 'border-green-500',
  }

  const stateIcons: Record<FieldState, React.ReactNode> = {
    empty: null,
    editing: null,
    filled_manual: <span className="text-blue-400 text-xs">✏️</span>,
    filled_ai: <span className="text-[#4b8c99] text-xs">🤖</span>,
    validated: <span className="text-green-500 text-xs">✅</span>,
  }

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="text-sm font-medium text-gray-700 flex items-center gap-2">
          {label}
          {stateIcons[fieldState]}
        </label>
        {value && !validated && onValidate && (
          <button
            onClick={onValidate}
            className="text-xs text-gray-500 hover:text-green-500 transition-colors"
          >
            Validar
          </button>
        )}
      </div>

      {type === 'textarea'
        ? (
          <textarea
            id={id}
            value={value}
            onChange={e => onChange(e.target.value.slice(0, maxChars))}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            rows={3}
            className={cn(
              'w-full px-3 py-2 rounded-lg border-2 transition-all duration-200',
              'text-sm text-gray-900 placeholder-gray-400',
              'resize-none',
              'focus:outline-none',
              stateStyles[fieldState],
            )}
          />
        )
        : (
          <input
            id={id}
            type="text"
            value={value}
            onChange={e => onChange(e.target.value.slice(0, maxChars))}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            className={cn(
              'w-full px-3 py-2 rounded-lg border-2 transition-all duration-200',
              'text-sm text-gray-900 placeholder-gray-400',
              'focus:outline-none',
              stateStyles[fieldState],
            )}
          />
        )}

      {/* Character count */}
      <div className="text-xs text-gray-400 text-right">
        {value.length}/{maxChars}
      </div>

      {/* AI Suggestion */}
      {pendingSuggestion && (
        <div className="bg-[#4b8c99]/5 border border-[#4b8c99]/20 rounded-lg p-3 space-y-2">
          <div className="flex items-start gap-2">
            <span className="text-lg">🤖</span>
            <p className="text-sm text-gray-700 flex-1">{pendingSuggestion}</p>
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

export default React.memo(CanvasField)
