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

        {/* Framework S.E.I. Didactic Box */}
        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4">
          <h2 className="text-sm font-bold text-indigo-900 mb-3 flex items-center gap-2">
            <span>🧠</span> FRAMEWORK S.E.I.
          </h2>

          <div className="space-y-3">
            <div className="flex gap-3 items-start">
              <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 text-xs font-bold text-indigo-700">
                S
              </div>
              <div>
                <strong className="text-sm text-indigo-900 block">Situação</strong>
                <p className="text-xs text-indigo-700 leading-snug">
                  O que aconteceu? Descreva apenas os fatos, sem adjetivos ou julgamentos.
                </p>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 text-xs font-bold text-indigo-700">
                E
              </div>
              <div>
                <strong className="text-sm text-indigo-900 block">Evidência</strong>
                <p className="text-xs text-indigo-700 leading-snug">
                  Como provo isso? Reúna dados quantitativos ou qualitativos.
                </p>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 text-xs font-bold text-indigo-700">
                I
              </div>
              <div>
                <strong className="text-sm text-indigo-900 block">Intervenção</strong>
                <p className="text-xs text-indigo-700 leading-snug">
                  O que vou fazer? Proponha um teste prático ou uma ação direta.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-[#4b8c99]/10 border border-[#4b8c99]/20 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-[#3d7580] mb-2">
            💡 Como usar
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Copie o prompt do agente desejado e cole no ChatGPT ou Gemini.
            Ele guiará você usando o Framework S.E.I.
          </p>
        </div>
      </div>
    </div>
  )
}

export default React.memo(DocsPage)
