'use client'

import type { FC } from 'react'
import React, { useState, useCallback } from 'react'
import cn from 'classnames'
import { useCanvasStore } from '@/stores'
import CanvasSection from './CanvasSection'
import CanvasField from './CanvasField'
import CanvasListField from './CanvasListField'
import CanvasRadioField, { problemTypeOptions, autonomyOptions } from './CanvasRadioField'

interface CanvasSEIProps {
  isCollapsed?: boolean
  onToggleCollapse?: () => void
  className?: string
}

const CanvasSEI: FC<CanvasSEIProps> = ({
  isCollapsed = false,
  onToggleCollapse,
  className,
}) => {
  const {
    getCurrentCanvas,
    pendingSuggestions,
    updateField,
    validateField,
    acceptSuggestion,
    rejectSuggestion,
    addHypothesis,
    removeHypothesis,
    updateHypothesis,
    getCompletionStatus,
  } = useCanvasStore()

  // Get the current canvas (per-conversation)
  const currentCanvas = getCurrentCanvas()

  // Section expansion state
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    situacao: true,
    evidencias: false,
    intervencao: false,
  })

  const toggleSection = useCallback((section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }))
  }, [])

  // Get pending suggestion for a field
  const getSuggestion = useCallback(
    (field: string) => pendingSuggestions.find(s => s.field === field)?.value,
    [pendingSuggestions],
  )

  if (!currentCanvas) {
    return (
      <div className={cn('p-4 flex items-center justify-center', className)}>
        <div className="text-gray-500">Carregando Canvas...</div>
      </div>
    )
  }

  const completion = getCompletionStatus()

  // Helper to get completion status type
  const getStatusType = (percent: number): 'empty' | 'partial' | 'complete' => {
    if (percent === 0) { return 'empty' }
    if (percent === 100) { return 'complete' }
    return 'partial'
  }

  return (
    <div className={cn('bg-[#f2efeb] flex flex-col h-full', className)}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
        <div className="flex items-center gap-2">
          <span className="text-xl">📋</span>
          <h2 className="font-bold text-gray-900">Canvas S.E.I.</h2>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-xs text-gray-500">
            {completion.total}% completo
          </div>
          {onToggleCollapse && (
            <button
              onClick={onToggleCollapse}
              className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label={isCollapsed ? 'Expandir' : 'Colapsar'}
            >
              <svg
                className={cn(
                  'w-5 h-5 text-gray-500 transition-transform',
                  isCollapsed && 'rotate-180',
                )}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      {!isCollapsed && (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* SITUAÇÃO Section */}
          <CanvasSection
            title="SITUAÇÃO"
            icon="📡"
            isExpanded={expandedSections.situacao}
            onToggle={() => toggleSection('situacao')}
            completionStatus={getStatusType(completion.situacao)}
            completionPercent={completion.situacao}
          >
            <CanvasField
              id="cena"
              label="A Cena"
              placeholder="O que acontece? Quando? Onde? Com quem?"
              value={currentCanvas.situacao.cena.value}
              source={currentCanvas.situacao.cena.source}
              validated={currentCanvas.situacao.cena.validated}
              onChange={v => updateField('situacao.cena', v, 'manual')}
              onValidate={() => validateField('situacao.cena')}
              pendingSuggestion={getSuggestion('situacao.cena')}
              onAcceptSuggestion={() => acceptSuggestion('situacao.cena')}
              onRejectSuggestion={() => rejectSuggestion('situacao.cena')}
              maxChars={500}
            />
            <CanvasField
              id="impacto"
              label="O Impacto"
              placeholder="Como isso afeta o time/cliente/negócio?"
              value={currentCanvas.situacao.impacto.value}
              source={currentCanvas.situacao.impacto.source}
              validated={currentCanvas.situacao.impacto.validated}
              onChange={v => updateField('situacao.impacto', v, 'manual')}
              onValidate={() => validateField('situacao.impacto')}
              pendingSuggestion={getSuggestion('situacao.impacto')}
              onAcceptSuggestion={() => acceptSuggestion('situacao.impacto')}
              onRejectSuggestion={() => rejectSuggestion('situacao.impacto')}
              maxChars={300}
            />
          </CanvasSection>

          {/* EVIDÊNCIAS Section */}
          <CanvasSection
            title="EVIDÊNCIAS"
            icon="🔍"
            isExpanded={expandedSections.evidencias}
            onToggle={() => toggleSection('evidencias')}
            completionStatus={getStatusType(completion.evidencias)}
            completionPercent={completion.evidencias}
          >
            <CanvasField
              id="dados"
              label="Dados/Provas"
              placeholder="Que números ou fatos comprovam o problema?"
              value={currentCanvas.evidencias.dados.value}
              source={currentCanvas.evidencias.dados.source}
              validated={currentCanvas.evidencias.dados.validated}
              onChange={v => updateField('evidencias.dados', v, 'manual')}
              onValidate={() => validateField('evidencias.dados')}
              pendingSuggestion={getSuggestion('evidencias.dados')}
              onAcceptSuggestion={() => acceptSuggestion('evidencias.dados')}
              onRejectSuggestion={() => rejectSuggestion('evidencias.dados')}
              maxChars={400}
            />
            <CanvasListField
              id="hipoteses"
              label="Hipóteses de Causa"
              placeholder="Por que isso pode estar acontecendo?"
              items={currentCanvas.evidencias.hipoteses.items}
              maxItems={4}
              itemMaxChars={150}
              onAddItem={v => addHypothesis(v, 'manual')}
              onRemoveItem={removeHypothesis}
              onUpdateItem={updateHypothesis}
              pendingSuggestion={getSuggestion('evidencias.hipoteses')}
              onAcceptSuggestion={() => acceptSuggestion('evidencias.hipoteses')}
              onRejectSuggestion={() => rejectSuggestion('evidencias.hipoteses')}
            />
            <CanvasRadioField
              id="tipo_problema"
              label="Tipo de Problema"
              options={problemTypeOptions}
              value={currentCanvas.evidencias.tipo_problema.value}
              source={currentCanvas.evidencias.tipo_problema.source}
              onChange={v => updateField('evidencias.tipo_problema', v, 'manual')}
              pendingSuggestion={getSuggestion('evidencias.tipo_problema')}
              onAcceptSuggestion={() => acceptSuggestion('evidencias.tipo_problema')}
              onRejectSuggestion={() => rejectSuggestion('evidencias.tipo_problema')}
            />
          </CanvasSection>

          {/* INTERVENÇÃO Section */}
          <CanvasSection
            title="INTERVENÇÃO"
            icon="🚀"
            isExpanded={expandedSections.intervencao}
            onToggle={() => toggleSection('intervencao')}
            completionStatus={getStatusType(completion.intervencao)}
            completionPercent={completion.intervencao}
          >
            <CanvasField
              id="acao"
              label="Ação Proposta"
              placeholder="O que será feito para resolver?"
              value={currentCanvas.intervencao.acao.value}
              source={currentCanvas.intervencao.acao.source}
              validated={currentCanvas.intervencao.acao.validated}
              onChange={v => updateField('intervencao.acao', v, 'manual')}
              onValidate={() => validateField('intervencao.acao')}
              pendingSuggestion={getSuggestion('intervencao.acao')}
              onAcceptSuggestion={() => acceptSuggestion('intervencao.acao')}
              onRejectSuggestion={() => rejectSuggestion('intervencao.acao')}
              maxChars={500}
            />
            <CanvasRadioField
              id="autonomia"
              label="Nível de Autonomia"
              options={autonomyOptions}
              value={currentCanvas.intervencao.autonomia.value}
              source={currentCanvas.intervencao.autonomia.source}
              onChange={v => updateField('intervencao.autonomia', v, 'manual')}
              pendingSuggestion={getSuggestion('intervencao.autonomia')}
              onAcceptSuggestion={() => acceptSuggestion('intervencao.autonomia')}
              onRejectSuggestion={() => rejectSuggestion('intervencao.autonomia')}
            />
            <CanvasField
              id="proximo_passo"
              label="Próximo Passo Imediato"
              placeholder="Qual a primeira ação concreta?"
              value={currentCanvas.intervencao.proximo_passo.value}
              source={currentCanvas.intervencao.proximo_passo.source}
              validated={currentCanvas.intervencao.proximo_passo.validated}
              onChange={v => updateField('intervencao.proximo_passo', v, 'manual')}
              onValidate={() => validateField('intervencao.proximo_passo')}
              pendingSuggestion={getSuggestion('intervencao.proximo_passo')}
              onAcceptSuggestion={() => acceptSuggestion('intervencao.proximo_passo')}
              onRejectSuggestion={() => rejectSuggestion('intervencao.proximo_passo')}
              maxChars={200}
              type="text"
            />
          </CanvasSection>

        </div>
      )}

      {/* Collapsed Summary */}
      {isCollapsed && (
        <div className="p-3 flex items-center justify-between bg-white">
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span>📡 {completion.situacao}%</span>
            <span>🔍 {completion.evidencias}%</span>
            <span>🚀 {completion.intervencao}%</span>
          </div>
          <button
            onClick={onToggleCollapse}
            className="text-xs text-[#4b8c99] font-medium"
          >
            Expandir
          </button>
        </div>
      )}
    </div>
  )
}

export default React.memo(CanvasSEI)
