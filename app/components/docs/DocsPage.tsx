'use client'

import type { FC } from 'react'
import React from 'react'
import { useNavigationStore } from '@/stores'
import { agents } from './agents'
import AgentCard from './AgentCard'
import AgentDetail from './AgentDetail'

const DocsPage: FC = () => {
  const { docsSelectedAgent, setDocsAgent } = useNavigationStore()

  const selectedAgent = docsSelectedAgent
    ? agents.find(a => a.id === docsSelectedAgent)
    : null

  // Show detail view if an agent is selected
  if (selectedAgent) {
    return (
      <AgentDetail
        agent={selectedAgent}
        onBack={() => setDocsAgent(null)}
      />
    )
  }

  // Show list view
  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 p-4">
        <h1 className="text-lg font-bold text-gray-900">
          Toolkit de Prompts
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Agentes que ajudam a resolver problemas
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Agents Section */}
        <div>
          <h2 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <span>📂</span> AGENTES DISPONÍVEIS
          </h2>
          <div className="space-y-3">
            {agents.map(agent => (
              <AgentCard
                key={agent.id}
                agent={agent}
                onClick={() => setDocsAgent(agent.id)}
              />
            ))}
          </div>
        </div>

        {/* Extra Resources Section */}
        <div>
          <h2 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <span>📚</span> RECURSOS EXTRAS
          </h2>
          <div className="space-y-2">
            <div className="bg-white rounded-lg p-3 border border-gray-200 text-sm text-gray-600">
              <span className="mr-2">•</span>
              Guia de Tipos de Problema (Cynefin)
            </div>
            <div className="bg-white rounded-lg p-3 border border-gray-200 text-sm text-gray-600">
              <span className="mr-2">•</span>
              Checklist Anti-Viés
            </div>
            <div className="bg-white rounded-lg p-3 border border-gray-200 text-sm text-gray-600">
              <span className="mr-2">•</span>
              Template de Pre-Mortem
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-[#4b8c99]/10 border border-[#4b8c99]/20 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-[#3d7580] mb-2">
            💡 Como usar
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Copie o prompt desejado e cole no ChatGPT, Claude ou Gemini.
            O agente vai guiar você com perguntas reflexivas.
          </p>
        </div>
      </div>
    </div>
  )
}

export default React.memo(DocsPage)
