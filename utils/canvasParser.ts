/**
 * Canvas Parser Utilities
 * Handles parsing of [CANVAS_UPDATE] blocks from Dify responses
 */

export interface CanvasUpdate {
  field: string
  value: string
  source: 'ai'
  pending: boolean
}

/**
 * Parse CANVAS_UPDATE blocks from a response string
 * Supports multiple formats:
 * Format 1: [CANVAS_UPDATE] campo: situacao.cena valor: "O texto" [/CANVAS_UPDATE]
 * Format 2: Multi-line with newlines between campo and valor
 */
export function parseCanvasUpdates(response: string): CanvasUpdate[] {
  const updates: CanvasUpdate[] = []

  // Robust regex that handles:
  // 1. Nested quotes in value
  // 2. Missing quotes in value
  // 3. Newlines in value
  // 4. Loose whitespace
  // Capture strategy: Find 'campo:', capture line. Find 'valor:', capture until '[/CANVAS_UPDATE]'
  const regex = /\[CANVAS_UPDATE\][\s\S]*?campo:\s*([^\n\r]+)[\s\S]*?valor:\s*(?:["']?)([\s\S]*?)(?:["']?)\s*\[\/CANVAS_UPDATE\]/gi

  let match = regex.exec(response)
  while (match !== null) {
    let field = match[1].trim()
    const value = match[2].trim()

    // Clean up quotes from field if present
    field = field.replace(/^["']|["']$/g, '')

    // Clean up quotes from value if capture included them (rare edge case with lazy quantifier)
    // actually the regex (?:["']?) at the end handles the trailing quote, so match[2] should be clean-ish.
    // But if the LLM did valor: "content", match[2] is content.
    // If valor: content, match[2] is content.
    // If valor: "cont"ent", match[2] is cont"ent. Correct.

    if (field && value) {
      updates.push({
        field,
        value,
        source: 'ai',
        pending: true,
      })
    }
    match = regex.exec(response)
  }

  return updates
}

/**
 * Remove CANVAS_UPDATE blocks from response to display clean text
 */
export function stripCanvasUpdates(response: string): string {
  return response
    .replace(/\[CANVAS_UPDATE\][\s\S]*?\[\/CANVAS_UPDATE\]/gi, '')
    .replace(/^-{3,}$/gm, '') // Remove markdown horizontal rules (---)
    .replace(/\n{3,}/g, '\n\n') // Clean up multiple newlines
    .trim()
}

/**
 * Check if a response contains any CANVAS_UPDATE blocks
 */
export function hasCanvasUpdates(response: string): boolean {
  return /\[CANVAS_UPDATE\]/i.test(response)
}

/**
 * Map of field paths to human-readable labels
 */
export const fieldLabels: Record<string, string> = {
  'situacao.cena': 'A Cena',
  'situacao.impacto': 'O Impacto',
  'evidencias.dados': 'Dados/Provas',
  'evidencias.hipoteses': 'Hipóteses',
  'evidencias.tipo_problema': 'Tipo de Problema',
  'intervencao.acao': 'Ação Proposta',
  'intervencao.autonomia': 'Nível de Autonomia',
  'intervencao.proximo_passo': 'Próximo Passo',
}

/**
 * Get human-readable label for a field path
 */
export function getFieldLabel(path: string): string {
  return fieldLabels[path] || path
}
