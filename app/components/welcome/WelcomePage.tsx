'use client'

import type { FC, KeyboardEvent } from 'react'
import React, { useState, useCallback } from 'react'

interface WelcomePageProps {
  onSend: (message: string) => void
  className?: string
}

const suggestions = [
  'Me ajude a definir um problema',
  'Me ajude a criticar uma intervenção',
  'Me ajude a coletar evidências sobre um desafio',
]

const WelcomePage: FC<WelcomePageProps> = ({
  onSend,
  className,
}) => {
  const [inputValue, setInputValue] = useState('')

  const handleSend = useCallback(() => {
    const trimmed = inputValue.trim()
    if (trimmed) {
      onSend(trimmed)
      setInputValue('')
    }
  }, [inputValue, onSend])

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }, [handleSend])

  return (
    <div className={`flex flex-col h-full overflow-hidden ${className || ''}`}>
      {/* Center content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-6 overflow-hidden">
        {/* Welcome Message */}
        <div className="max-w-lg w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-4">
          <div className="text-3xl mb-3 text-center">👋</div>
          <h1 className="text-lg font-bold text-gray-900 text-center mb-2">
            Bem-vindo ao Co-Piloto Analítico!
          </h1>
          <p className="text-gray-600 text-center text-sm leading-relaxed">
            Sou seu parceiro para transformar "ruídos" do dia a dia em sinais claros.
            Não se preocupe se você não sabe por onde começar. Esse é justamente o ponto: <strong>vamos descobrir juntos</strong>.
          </p>
          <p className="text-gray-800 text-center text-sm font-medium mt-3">
            Conte-me: o que está te incomodando no trabalho ultimamente?
          </p>
        </div>

        {/* Suggestions */}
        <div className="max-w-lg w-full mb-3">
          <p className="text-xs text-gray-500 mb-2 text-center">💬 Ou clique para começar:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => onSend(suggestion)}
                className="px-3 py-1.5 bg-white border border-gray-200 rounded-full hover:bg-gray-50 hover:border-[#4b8c99] transition-all text-gray-600 text-xs"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-xs text-gray-400 text-center">
          Workshop: Pensamento Analítico • Unimed Seguros
        </div>
      </div>

      {/* Input Bar at bottom */}
      <div className="flex-shrink-0 border-t border-gray-100 bg-white p-3">
        <div className="max-w-lg mx-auto">
          <div className="flex items-end gap-2 bg-gray-50 rounded-xl px-3 py-2 border border-gray-200 focus-within:border-[#4b8c99] transition-colors">
            <textarea
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Digite algo aqui..."
              className="flex-1 bg-transparent resize-none outline-none text-gray-700 placeholder-gray-400 text-sm max-h-[80px]"
              rows={1}
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim()}
              className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-[#4b8c99] text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#3d7580] transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(WelcomePage)
