'use client'

import type { FC } from 'react'
import React from 'react'
import cn from 'classnames'
import type { ConversationItem } from '@/types/app'

interface HistoryPageProps {
  conversationList: ConversationItem[]
  currentConversationId: string
  onSelectConversation: (id: string) => void
}

function getTimeAgo(date: Date | number | undefined): string {
  if (!date) { return '' }
  const now = new Date()
  const then = new Date(date)
  const diffMs = now.getTime() - then.getTime()
  const diffMins = Math.floor(diffMs / (1000 * 60))
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffMins < 60) { return `Há ${diffMins} min` }
  if (diffHours < 24) { return `Há ${diffHours}h` }
  if (diffDays === 0) { return 'Hoje' }
  if (diffDays === 1) { return 'Ontem' }
  if (diffDays < 7) { return `Há ${diffDays} dias` }
  return then.toLocaleDateString('pt-BR')
}

function getDateGroup(date: Date | number | undefined): string {
  if (!date) { return 'Outros' }
  const now = new Date()
  const then = new Date(date)
  const diffDays = Math.floor((now.getTime() - then.getTime()) / (1000 * 60 * 60 * 24))

  if (diffDays === 0) { return 'Hoje' }
  if (diffDays === 1) { return 'Ontem' }
  if (diffDays <= 7) { return 'Esta semana' }
  if (diffDays <= 14) { return 'Semana passada' }
  if (diffDays <= 30) { return 'Este mês' }
  return 'Mais antigos'
}

const HistoryPage: FC<HistoryPageProps> = ({
  conversationList,
  currentConversationId,
  onSelectConversation,
}) => {
  // Filter out the "new chat" placeholder
  const realConversations = conversationList.filter(c => c.id !== '-1')

  // Group by date
  const grouped = new Map<string, ConversationItem[]>()
  realConversations.forEach((conv) => {
    const key = getDateGroup(conv.created_at)
    const existing = grouped.get(key) || []
    grouped.set(key, [...existing, conv])
  })

  if (realConversations.length === 0) {
    return (
      <div className="flex flex-col h-full bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-100 p-4">
          <h1 className="text-lg font-bold text-gray-900">
            Histórico
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Conversas anteriores
          </p>
        </div>

        {/* Empty State */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center">
            <span className="text-6xl mb-4 block">📭</span>
            <h2 className="text-lg font-medium text-gray-700 mb-2">
              Nenhuma conversa ainda
            </h2>
            <p className="text-sm text-gray-500">
              Inicie uma conversa com o Co-Piloto para começar.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 p-4">
        <h1 className="text-lg font-bold text-gray-900">
          Histórico
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          {realConversations.length} {realConversations.length === 1 ? 'conversa' : 'conversas'}
        </p>
      </div>

      {/* Search */}
      <div className="p-4 bg-white border-b border-gray-100">
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Buscar conversa..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4b8c99] focus:border-transparent"
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-20">
        {Array.from(grouped.entries()).map(([dateKey, conversations]) => (
          <div key={dateKey}>
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              {dateKey}
            </h2>
            <div className="space-y-2">
              {conversations.map(conv => (
                <button
                  key={conv.id}
                  onClick={() => onSelectConversation(conv.id)}
                  className={cn(
                    'w-full text-left p-4 bg-white rounded-xl border-2 transition-all duration-200',
                    'hover:shadow-md',
                    'focus:outline-none focus:ring-2 focus:ring-[#4b8c99] focus:ring-offset-2',
                    currentConversationId === conv.id
                      ? 'border-[#4b8c99] bg-[#4b8c99]/5'
                      : 'border-gray-200 hover:border-gray-300',
                  )}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-xl">💬</span>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 truncate">
                        {conv.name || 'Nova conversa'}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {getTimeAgo(conv.created_at)}
                      </p>
                      {conv.introduction && (
                        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                          {conv.introduction.slice(0, 100)}...
                        </p>
                      )}
                    </div>
                    {currentConversationId === conv.id && (
                      <span className="text-[#4b8c99] text-xs font-medium">
                        Ativa
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default React.memo(HistoryPage)
