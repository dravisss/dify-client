'use client'

import type { FC } from 'react'
import React, { useState, useCallback } from 'react'
import cn from 'classnames'
import copy from 'copy-to-clipboard'
import type { Agent } from './agents'
import Toast from '@/app/components/base/toast'

interface AgentDetailProps {
  agent: Agent
  onBack: () => void
}

const phaseLabels: Record<Agent['seiPhase'], string> = {
  'situacao': 'Fase S - Situação',
  'evidencias': 'Fase E - Evidências',
  'pre-intervencao': 'Pré-Intervenção',
  'intervencao': 'Fase I - Intervenção',
}

const AgentDetail: FC<AgentDetailProps> = ({ agent, onBack }) => {
  const [showFullPrompt, setShowFullPrompt] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(() => {
    const success = copy(agent.prompt)
    if (success) {
      setCopied(true)
      Toast.notify({ type: 'success', message: 'Copiado para a área de transferência!' })
      setTimeout(() => setCopied(false), 2000)
    } else {
      Toast.notify({ type: 'error', message: 'Erro ao copiar' })
    }
  }, [agent.prompt])

  const previewText = agent.prompt.slice(0, 300) + (agent.prompt.length > 300 ? '...' : '')

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-gray-100">
        <button
          onClick={onBack}
          className="p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Voltar"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="text-sm font-mono text-gray-500">AGENTE {agent.number}</span>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Agent Header */}
        <div className="text-center">
          <span className="text-5xl mb-3 block" role="img" aria-label={agent.name}>
            {agent.icon}
          </span>
          <h1 className="text-xl font-bold text-gray-900 mb-1">
            {agent.name}
          </h1>
          <p className="text-sm text-gray-500">
            {phaseLabels[agent.seiPhase]}
          </p>
        </div>

        {/* Description */}
        <div className="bg-gray-50 rounded-xl p-4">
          <h2 className="text-sm font-semibold text-gray-700 mb-2">
            Quando usar:
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            {agent.description}
          </p>
        </div>

        {/* What it does */}
        <div className="space-y-2">
          <h2 className="text-sm font-semibold text-gray-700">
            O que ele faz:
          </h2>
          <ul className="text-sm text-gray-600 space-y-1">
            {agent.id === 'tradutor' && (
              <>
                <li className="flex items-start gap-2"><span>•</span> Separa fato de opinião</li>
                <li className="flex items-start gap-2"><span>•</span> Identifica vieses cognitivos</li>
                <li className="flex items-start gap-2"><span>•</span> Ajuda a reescrever o problema de forma clara</li>
              </>
            )}
            {agent.id === 'navegador' && (
              <>
                <li className="flex items-start gap-2"><span>•</span> Classifica o tipo de problema (Ordenado/Complexo)</li>
                <li className="flex items-start gap-2"><span>•</span> Mapeia hipóteses de causa</li>
                <li className="flex items-start gap-2"><span>•</span> Investiga forças sistêmicas</li>
              </>
            )}
            {agent.id === 'bussola' && (
              <>
                <li className="flex items-start gap-2"><span>•</span> Define seu nível de autonomia</li>
                <li className="flex items-start gap-2"><span>•</span> Identifica quem precisa aprovar</li>
                <li className="flex items-start gap-2"><span>•</span> Oferece simulação de stakeholder</li>
              </>
            )}
            {agent.id === 'designer' && (
              <>
                <li className="flex items-start gap-2"><span>•</span> Cria testes seguros para problemas complexos</li>
                <li className="flex items-start gap-2"><span>•</span> Estrutura planos de ação</li>
                <li className="flex items-start gap-2"><span>•</span> Prepara pitches de aprovação</li>
              </>
            )}
          </ul>
        </div>

        {/* Prompt Preview */}
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <span>📋</span> PROMPT COMPLETO
          </h2>
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <pre className="text-xs text-gray-700 whitespace-pre-wrap font-mono leading-relaxed">
              {showFullPrompt ? agent.prompt : previewText}
            </pre>
            {agent.prompt.length > 300 && (
              <button
                onClick={() => setShowFullPrompt(!showFullPrompt)}
                className="text-[#4b8c99] text-sm mt-3 hover:underline"
              >
                {showFullPrompt ? '▲ Ver menos' : '▼ Ver texto completo'}
              </button>
            )}
          </div>
        </div>

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className={cn(
            'w-full py-3 px-4 rounded-xl font-medium',
            'flex items-center justify-center gap-2',
            'transition-all duration-200',
            copied
              ? 'bg-green-500 text-white'
              : 'bg-[#4b8c99] text-white hover:bg-[#3d7580]',
          )}
        >
          {copied
            ? (
              <>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Copiado!
              </>
            )
            : (
              <>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                COPIAR PROMPT
              </>
            )}
        </button>

        {/* Usage Tip */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-amber-800 mb-1 flex items-center gap-2">
            <span>💡</span> DICA DE USO
          </h3>
          <p className="text-sm text-amber-700">
            {agent.usageTip}
          </p>
        </div>
      </div>
    </div>
  )
}

export default React.memo(AgentDetail)
