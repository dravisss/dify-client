'use client'

import type { FC } from 'react'
import React from 'react'
import cn from 'classnames'

interface HypothesisItem {
  value: string
  source: 'manual' | 'ai'
}

interface CanvasListFieldProps {
  id: string
  label: string
  placeholder: string
  items: HypothesisItem[]
  maxItems?: number
  itemMaxChars?: number
  onAddItem: (value: string) => void
  onRemoveItem: (index: number) => void
  onUpdateItem: (index: number, value: string) => void
  pendingSuggestion?: string
  onAcceptSuggestion?: () => void
  onRejectSuggestion?: () => void
  className?: string
}

const CanvasListField: FC<CanvasListFieldProps> = ({
  _id,
  label,
  placeholder,
  items,
  maxItems = 4,
  itemMaxChars = 150,
  onAddItem,
  onRemoveItem,
  onUpdateItem,
  pendingSuggestion,
  onAcceptSuggestion,
  onRejectSuggestion,
  className,
}) => {
  const [newItemValue, setNewItemValue] = React.useState('')

  const handleAddItem = () => {
    if (newItemValue.trim() && items.length < maxItems) {
      onAddItem(newItemValue.trim())
      setNewItemValue('')
    }
  }

  // const handleKeyDown = (e: React.KeyboardEvent) => {
  //     if (e.key === 'Enter') {
  //         e.preventDefault()
  //         handleAddItem()
  //     }
  // }

  return (
    <div className={cn('space-y-3', className)}>
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <span className="text-xs text-gray-400">
          {items.length}/{maxItems}
        </span>
      </div>

      {/* Existing items */}
      {items.length > 0 && (
        <div className="space-y-2">
          {items.map((item, index) => (
            <div key={index} className="flex items-start gap-2">
              <span className="text-sm text-gray-500 mt-2 w-5">{index + 1}.</span>
              <div className="flex-1 relative">
                <textarea
                  value={item.value}
                  onChange={(e) => {
                    onUpdateItem(index, e.target.value.slice(0, itemMaxChars))
                    // Auto-resize
                    e.target.style.height = 'auto'
                    e.target.style.height = `${e.target.scrollHeight}px`
                  }}
                  rows={1}
                  style={{ height: 'auto', minHeight: '38px' }}
                  className={cn(
                    'w-full px-3 py-2 pr-8 rounded-lg border-2 text-sm',
                    'focus:outline-none focus:ring-2 focus:ring-[#4b8c99]/20 focus:border-[#4b8c99]',
                    'resize-none overflow-hidden', // Prevent manual resize, hide scrollbar
                    item.source === 'ai'
                      ? 'border-[#4b8c99]/30 bg-[#4b8c99]/5'
                      : 'border-gray-200',
                  )}
                  // Initial auto-resize
                  ref={(el) => {
                    if (el) {
                      el.style.height = 'auto'
                      el.style.height = `${el.scrollHeight}px`
                    }
                  }}
                />
                {item.source === 'ai' && (
                  <span className="absolute right-2 top-2 text-xs">
                    🤖
                  </span>
                )}
              </div>
              <button
                onClick={() => onRemoveItem(index)}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors mt-1"
                aria-label="Remover hipótese"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Add new item */}
      {items.length < maxItems && (
        <div className="flex items-start gap-2">
          <span className="text-sm text-gray-400 w-5 mt-2.5">{items.length + 1}.</span>
          <textarea
            value={newItemValue}
            onChange={(e) => {
              setNewItemValue(e.target.value.slice(0, itemMaxChars))
              e.target.style.height = 'auto'
              e.target.style.height = `${e.target.scrollHeight}px`
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleAddItem()
              }
            }}
            placeholder={placeholder}
            rows={1}
            className="flex-1 px-3 py-2 rounded-lg border-2 border-dashed border-gray-300 text-sm placeholder-gray-400 focus:outline-none focus:border-[#4b8c99] focus:bg-white transition-colors resize-none overflow-hidden min-h-[42px]"
          />
          <button
            onClick={handleAddItem}
            disabled={!newItemValue.trim()}
            className={cn(
              'p-2 rounded-lg transition-colors mt-1',
              newItemValue.trim()
                ? 'text-[#4b8c99] hover:bg-[#4b8c99]/10'
                : 'text-gray-300 cursor-not-allowed',
            )}
            aria-label="Adicionar hipótese"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      )}

      {/* AI Suggestion */}
      {pendingSuggestion && (
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
              ✅ Adicionar Itens
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

export default React.memo(CanvasListField)
