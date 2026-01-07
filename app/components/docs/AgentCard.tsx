'use client'

import type { FC } from 'react'
import React from 'react'
import cn from 'classnames'
import type { Agent } from './agents'

interface AgentCardProps {
  agent: Agent
  onClick: () => void
}

const phaseColors: Record<Agent['seiPhase'], string> = {
  'situacao': 'bg-blue-50 border-blue-200',
  'evidencias': 'bg-purple-50 border-purple-200',
  'pre-intervencao': 'bg-amber-50 border-amber-200',
  'intervencao': 'bg-emerald-50 border-emerald-200',
}

const phaseLabels: Record<Agent['seiPhase'], string> = {
  'situacao': 'Situação',
  'evidencias': 'Evidências',
  'pre-intervencao': 'Pré-Intervenção',
  'intervencao': 'Intervenção',
}

const AgentCard: FC<AgentCardProps> = ({ agent, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full text-left p-4 rounded-xl border-2',
        'transition-all duration-200',
        'hover:shadow-md hover:scale-[1.01]',
        'focus:outline-none focus:ring-2 focus:ring-[#4b8c99] focus:ring-offset-2',
        phaseColors[agent.seiPhase],
      )}
    >
      <div className="flex items-start gap-3">
        <span className="text-3xl" role="img" aria-label={agent.name}>
          {agent.icon}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono text-gray-500">
              AGENTE {agent.number}
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
              {phaseLabels[agent.seiPhase]}
            </span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">
            {agent.name}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2">
            {agent.subtitle}
          </p>
        </div>
        <svg
          className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </button>
  )
}

export default React.memo(AgentCard)
