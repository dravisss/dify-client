'use client'

import type { FC, ReactNode } from 'react'
import React from 'react'
import cn from 'classnames'

type CompletionStatus = 'empty' | 'partial' | 'complete'

interface CanvasSectionProps {
  title: string
  icon: string
  isExpanded: boolean
  onToggle: () => void
  completionStatus: CompletionStatus
  completionPercent?: number
  children: ReactNode
  className?: string
}

const statusColors: Record<CompletionStatus, string> = {
  empty: 'bg-gray-200',
  partial: 'bg-amber-400',
  complete: 'bg-green-500',
}

const CanvasSection: FC<CanvasSectionProps> = ({
  title,
  icon,
  isExpanded,
  onToggle,
  completionStatus,
  completionPercent = 0,
  children,
  className,
}) => {
  return (
    <div className={cn('border border-gray-200 rounded-xl overflow-hidden', className)}>
      {/* Header */}
      <button
        onClick={onToggle}
        className={cn(
          'w-full flex items-center justify-between p-4',
          'bg-gray-50 hover:bg-gray-100 transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#4b8c99]',
        )}
      >
        <div className="flex items-center gap-3">
          <span className="text-xl" role="img" aria-hidden>
            {icon}
          </span>
          <span className="font-semibold text-gray-900">{title}</span>
        </div>

        <div className="flex items-center gap-3">
          {/* Progress indicator */}
          <div className="flex items-center gap-2">
            <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={cn('h-full transition-all duration-300', statusColors[completionStatus])}
                style={{ width: `${completionPercent}%` }}
              />
            </div>
            <span className="text-xs text-gray-500 w-8">{completionPercent}%</span>
          </div>

          {/* Chevron */}
          <svg
            className={cn(
              'w-5 h-5 text-gray-400 transition-transform duration-200',
              isExpanded && 'rotate-180',
            )}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {/* Content */}
      <div
        className={cn(
          'overflow-hidden transition-all duration-300',
          isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <div className="p-4 space-y-4 bg-white">
          {children}
        </div>
      </div>
    </div>
  )
}

export default React.memo(CanvasSection)
