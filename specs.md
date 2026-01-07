Especificações Técnicas: WebApp Co-Piloto Analítico
"Do Ruído à Transmissão" — Unimed Seguros
Versão: 1.0
Data: Janeiro 2026
Baseado em: Hipótese 1.2 (Assistente Linear) + Hipótese 3.3 (Canvas Vivo)

1. VISÃO GERAL DO PRODUTO
1.1 Conceito Central
Um webapp mobile-first que combina:

Chat Assistido — Conversa guiada pelo Co-Piloto Analítico (Dify)
Canvas Interativo — Campos editáveis que alimentam o contexto da IA
Biblioteca de Prompts — Toolkit completo para uso externo (copiar/colar)
1.2 Proposta de Valor
"Um companheiro de bolso que te ajuda a transformar qualquer problema em uma proposta estruturada — durante o workshop e no dia a dia."

1.3 Usuários-Alvo
Analistas e Supervisores da Unimed Seguros
Participantes do Workshop "Do Ruído à Transmissão"
Nível técnico: Baixo a médio (não-desenvolvedores)
2. ARQUITETURA DE TELAS
2.1 Mapa de Navegação
graph TD
    A[Splash Screen] --> B[Home]
    B --> C[Chat + Canvas]
    B --> D[Docs / Toolkit]
    B --> E[Histórico]
    
    C --> C1[Canvas S.E.I. Editável]
    C --> C2[Chat com Co-Piloto]
    C --> C3[Exportar Canvas]
    
    D --> D1[Agente 1: Tradutor]
    D --> D2[Agente 2: Navegador]
    D --> D3[Agente 3: Bússola]
    D --> D4[Agente 4: Designer]
    
    E --> E1[Sessões Anteriores]
    E --> E2[Canvas Salvos]
2.2 Estrutura de Abas (Bottom Navigation)
Ícone	Nome	Descrição
💬	Chat	Conversa com Co-Piloto + Canvas Vivo
📚	Docs	Toolkit de Prompts para copiar
📁	Histórico	Sessões e Canvas salvos
3. TELA: CHAT + CANVAS VIVO
3.1 Layout Responsivo
Mobile (< 768px): Modo Sanfona
┌────────────────────────────────┐
│ ≡  CO-PILOTO ANALÍTICO    [⋮] │
├────────────────────────────────┤
│                                │
│  ▼ CANVAS S.E.I. [Expandir]    │
│  ┌──────────────────────────┐  │
│  │ ▸ Situação: [...]        │  │
│  │ ▸ Evidências: [...]      │  │
│  │ ▸ Intervenção: [...]     │  │
│  └──────────────────────────┘  │
│                                │
│ ───────────────────────────────│
│                                │
│  🤖 Olá! Em qual fase você     │
│     está hoje?                 │
│                                │
│  ┌────────────────────────┐    │
│  │ 📡 Situação            │    │
│  │ "Preciso limpar o      │    │
│  │  ruído do problema"    │    │
│  └────────────────────────┘    │
│  ┌────────────────────────┐    │
│  │ 🔍 Evidências          │    │
│  │ "Quero entender as     │    │
│  │  causas e fatores"     │    │
│  └────────────────────────┘    │
│  ┌────────────────────────┐    │
│  │ 🧭 Autonomia           │    │
│  │ "Sei resolver, mas     │    │
│  │  não sei se posso"     │    │
│  └────────────────────────┘    │
│  ┌────────────────────────┐    │
│  │ 🚀 Intervenção         │    │
│  │ "Preciso montar um     │    │
│  │  plano de ação"        │    │
│  └────────────────────────┘    │
│                                │
│  ───────── ou ─────────────    │
│                                │
│  ┌─────────────────────────┐   │
│  │ Descreva seu problema..│ ➤ │
│  └─────────────────────────┘   │
│                                │
└────────────────────────────────┘
Tablet/Desktop (≥ 768px): Split View
┌─────────────────────────────────────────────────────────┐
│  ≡  CO-PILOTO ANALÍTICO                          [⋮]   │
├─────────────────────────┬───────────────────────────────┤
│                         │                               │
│  📋 CANVAS S.E.I.       │   💬 CHAT                     │
│                         │                               │
│  ┌───────────────────┐  │   🤖 Olá! Sou o Co-Piloto.   │
│  │ SITUAÇÃO          │  │      Qual desafio você quer  │
│  │ ─────────────────│  │      colocar na mesa?         │
│  │ A Cena:           │  │                               │
│  │ [________________]│  │   ┌───────────────────────┐   │
│  │ [________________]│  │   │ A área de Compras     │ 👤│
│  │                   │  │   │ está demorando 5 dias │   │
│  │ Impacto:          │  │   │ para aprovar pedidos  │   │
│  │ [________________]│  │   └───────────────────────┘   │
│  └───────────────────┘  │                               │
│                         │   🤖 Entendi. Deixa eu        │
│  ┌───────────────────┐  │      confirmar: você está    │
│  │ EVIDÊNCIAS        │  │      dizendo que o tempo     │
│  │ ─────────────────│  │      médio de aprovação é    │
│  │ Dados/Provas:     │  │      5 dias. Isso sempre     │
│  │ [________________]│  │      foi assim ou mudou?     │
│  │ [________________]│  │                               │
│  │                   │  │   ┌───────────────────────┐   │
│  │ Hipóteses:        │  │   │ Mudou depois que o    │ 👤│
│  │ 1. [_____________]│  │   │ sistema novo entrou   │   │
│  │ 2. [_____________]│  │   └───────────────────────┘   │
│  │ 3. [_____________]│  │                               │
│  └───────────────────┘  │   🤖 Ótimo dado! Vou         │
│                         │      atualizar seu Canvas.   │
│  ┌───────────────────┐  │                               │
│  │ INTERVENÇÃO       │  │   ✅ Canvas atualizado:      │
│  │ ─────────────────│  │   → Situação: Preenchida     │
│  │ Ação Proposta:    │  │   → Evidências: 1 hipótese   │
│  │ [________________]│  │                               │
│  │ [________________]│  │                               │
│  │                   │  │                               │
│  │ Autonomia:        │  │                               │
│  │ ○ Transmitir      │  │                               │
│  │ ○ Amplificar      │  │                               │
│  └───────────────────┘  │                               │
│                         │   ┌─────────────────────┐     │
│  [💾 Salvar] [📤 Export]│   │ Digite aqui...      │ ➤   │
│                         │   └─────────────────────┘     │
└─────────────────────────┴───────────────────────────────┘
3.2 Canvas S.E.I. — Especificação Detalhada
Estrutura de Campos
canvas:
  situacao:
    - id: cena
      label: "A Cena"
      placeholder: "O que acontece? Quando? Onde? Com quem?"
      type: textarea
      max_chars: 500
      
    - id: impacto
      label: "O Impacto"
      placeholder: "Como isso afeta o time/cliente/negócio?"
      type: textarea
      max_chars: 300
      
  evidencias:
    - id: dados
      label: "Dados/Provas"
      placeholder: "Que números ou fatos comprovam o problema?"
      type: textarea
      max_chars: 400
      
    - id: hipoteses
      label: "Hipóteses de Causa"
      placeholder: "Por que isso pode estar acontecendo?"
      type: list
      max_items: 4
      item_max_chars: 150
      
    - id: tipo_problema
      label: "Tipo de Problema"
      type: radio
      options:
        - value: claro
          label: "Claro (Já tem solução conhecida)"
        - value: complicado
          label: "Complicado (Precisa de especialista)"
        - value: complexo
          label: "Complexo (Ninguém sabe a causa)"
        - value: caotico
          label: "Caótico (Crise em andamento)"
          
  intervencao:
    - id: acao
      label: "Ação Proposta"
      placeholder: "O que será feito para resolver?"
      type: textarea
      max_chars: 500
      
    - id: autonomia
      label: "Nível de Autonomia"
      type: radio
      options:
        - value: transmitir
          label: "🟢 Transmitir (Tenho autoridade)"
        - value: negociar
          label: "🟡 Negociar (Preciso de aprovação)"
        - value: amplificar
          label: "🔴 Amplificar (Fora do meu alcance)"
          
    - id: proximo_passo
      label: "Próximo Passo Imediato"
      placeholder: "Qual a primeira ação concreta?"
      type: text
      max_chars: 200
Estados Visuais do Campo
Estado	Visual	Descrição
empty	Borda cinza, placeholder visível	Campo não preenchido
editing	Borda turquesa, foco ativo	Usuário está digitando
filled_manual	Borda azul, ícone ✏️	Preenchido manualmente
filled_ai	Borda turquesa, ícone 🤖	Preenchido pelo Co-Piloto
validated	Borda verde, ícone ✅	Confirmado pelo usuário
3.3 Integração Canvas ↔ Chat
Fluxo de Dados Bidirecional
sequenceDiagram
    participant U as Usuário
    participant C as Canvas
    participant A as Co-Piloto (Dify)
    
    Note over U,A: FLUXO 1: Canvas → Chat
    U->>C: Preenche campo "Situação"
    C->>A: Envia contexto atualizado
    A->>U: "Você mencionou X. Quer explorar as causas?"
    
    Note over U,A: FLUXO 2: Chat → Canvas
    U->>A: "O problema são as glosas"
    A->>A: Extrai informação estruturada
    A->>C: Sugere preenchimento
    C-->>U: Mostra sugestão com botão [Aceitar]
    U->>C: Clica [Aceitar]
    C->>C: Campo preenchido com ícone 🤖
Prompt de Sistema (Dify) — Contexto do Canvas
O Co-Piloto sempre recebe o estado atual do Canvas como contexto:

## CONTEXTO DO CANVAS (Estado Atual)

### SITUAÇÃO
- **A Cena:** {{canvas.situacao.cena || "Não preenchido"}}
- **O Impacto:** {{canvas.situacao.impacto || "Não preenchido"}}

### EVIDÊNCIAS
- **Dados/Provas:** {{canvas.evidencias.dados || "Não preenchido"}}
- **Hipóteses:**
  {{#each canvas.evidencias.hipoteses}}
  {{@index}}. {{this}}
  {{/each}}
- **Tipo de Problema:** {{canvas.evidencias.tipo_problema || "Não classificado"}}

### INTERVENÇÃO
- **Ação Proposta:** {{canvas.intervencao.acao || "Não preenchido"}}
- **Autonomia:** {{canvas.intervencao.autonomia || "Não definida"}}
- **Próximo Passo:** {{canvas.intervencao.proximo_passo || "Não definido"}}

---

## INSTRUÇÃO ESPECIAL

Quando o usuário fornecer informações durante o chat que se encaixem em algum campo do Canvas:
1. Identifique qual campo é relevante
2. Reformule a informação de forma factual (sem adjetivos)
3. Responda com o formato especial:

[CANVAS_UPDATE]
campo: situacao.cena
valor: "O tempo de aprovação de pedidos passou de 2 para 5 dias após a implantação do novo sistema."
[/CANVAS_UPDATE]

Isso será interpretado pelo frontend para sugerir o preenchimento automático.
Lógica de Sugestão Automática
// Exemplo de parsing da resposta do Dify
function parseCanvasUpdate(response) {
  const regex = /\[CANVAS_UPDATE\]\s*campo:\s*(.+)\s*valor:\s*"(.+)"\s*\[\/CANVAS_UPDATE\]/g;
  const updates = [];
  
  let match;
  while ((match = regex.exec(response)) !== null) {
    updates.push({
      field: match[1].trim(),
      value: match[2].trim(),
      source: 'ai',
      pending: true // Aguarda confirmação do usuário
    });
  }
  
  return updates;
}
3.4 Ações do Canvas
Ação	Ícone	Descrição
Salvar Rascunho	💾	Salva estado atual no histórico
Exportar PDF	📄	Gera PDF com Canvas preenchido
Exportar Imagem	🖼️	Gera PNG para compartilhar
Copiar Texto	📋	Copia resumo em texto plain
Limpar Canvas	🗑️	Reseta todos os campos
Novo Problema	➕	Inicia nova sessão zerada
Template de Exportação (Texto)
# ANÁLISE DE PROBLEMA — CANVAS S.E.I.
**Data:** {{data_atual}}
**Analista:** {{nome_usuario}}

---

## 📡 SITUAÇÃO
**A Cena:** {{canvas.situacao.cena}}
**O Impacto:** {{canvas.situacao.impacto}}

## 🔍 EVIDÊNCIAS
**Dados/Provas:** {{canvas.evidencias.dados}}

**Hipóteses de Causa:**
{{#each canvas.evidencias.hipoteses}}
- {{this}}
{{/each}}

**Tipo de Problema:** {{canvas.evidencias.tipo_problema}}

## 🚀 INTERVENÇÃO
**Ação Proposta:** {{canvas.intervencao.acao}}
**Nível de Autonomia:** {{canvas.intervencao.autonomia}}
**Próximo Passo:** {{canvas.intervencao.proximo_passo}}

---
*Gerado pelo Co-Piloto Analítico Unimed*
4. TELA: DOCS / TOOLKIT DE PROMPTS
4.1 Estrutura da Seção
┌────────────────────────────────┐
│ ←  TOOLKIT DE PROMPTS          │
├────────────────────────────────┤
│                                │
│  🔍 Buscar prompt...           │
│                                │
│ ───────────────────────────────│
│                                │
│  📂 AGENTES DISPONÍVEIS        │
│                                │
│  ┌──────────────────────────┐  │
│  │ 📡 AGENTE 1              │  │
│  │ O Tradutor de Realidade  │  │
│  │ ─────────────────────────│  │
│  │ Limpar ruído e vieses    │  │
│  │ do problema inicial      │  │
│  │                          │  │
│  │ [Ver Prompt] [📋 Copiar] │  │
│  └──────────────────────────┘  │
│                                │
│  ┌──────────────────────────┐  │
│  │ 🔍 AGENTE 2              │  │
│  │ O Navegador de Contexto  │  │
│  │ ─────────────────────────│  │
│  │ Descobrir tipo e causas  │  │
│  │ do problema              │  │
│  │                          │  │
│  │ [Ver Prompt] [📋 Copiar] │  │
│  └──────────────────────────┘  │
│                                │
│  ┌──────────────────────────┐  │
│  │ 🧭 AGENTE 3              │  │
│  │ A Bússola de Autonomia   │  │
│  │ ─────────────────────────│  │
│  │ Mapear seu poder de      │  │
│  │ ação sobre o problema    │  │
│  │                          │  │
│  │ [Ver Prompt] [📋 Copiar] │  │
│  └──────────────────────────┘  │
│                                │
│  ┌──────────────────────────┐  │
│  │ 🚀 AGENTE 4              │  │
│  │ O Designer de Ação       │  │
│  │ ─────────────────────────│  │
│  │ Criar plano, teste ou    │  │
│  │ pitch de aprovação       │  │
│  │                          │  │
│  │ [Ver Prompt] [📋 Copiar] │  │
│  └──────────────────────────┘  │
│                                │
│ ───────────────────────────────│
│  📚 RECURSOS EXTRAS            │
│  • Guia de Tipos de Problema   │
│  • Checklist Anti-Viés         │
│  • Template de Pre-Mortem      │
│                                │
└────────────────────────────────┘
4.2 Tela de Detalhe do Prompt
┌────────────────────────────────┐
│ ← Voltar   AGENTE 1            │
├────────────────────────────────┤
│                                │
│  📡 O TRADUTOR DE REALIDADE    │
│  ════════════════════════════  │
│                                │
│  **Quando usar:**              │
│  Quando você está com uma      │
│  reclamação ou problema        │
│  confuso, cheio de emoção.     │
│                                │
│  **O que ele faz:**            │
│  • Separa fato de opinião      │
│  • Identifica vieses           │
│  • Ajuda a reescrever o        │
│    problema de forma clara     │
│                                │
│ ───────────────────────────────│
│                                │
│  📋 PROMPT COMPLETO            │
│  ┌──────────────────────────┐  │
│  │ Atue como meu Parceiro   │  │
│  │ de Clareza.              │  │
│  │                          │  │
│  │ Eu vou compartilhar um   │  │
│  │ problema que estou       │  │
│  │ enfrentando no trabalho. │  │
│  │ É provável que minha ... │  │
│  │                          │  │
│  │ [Ver texto completo ↓]   │  │
│  └──────────────────────────┘  │
│                                │
│  ┌────────────────────────┐    │
│  │ 📋 COPIAR PROMPT       │    │
│  └────────────────────────┘    │
│                                │
│  ✅ Copiado para a área de     │
│     transferência!             │
│                                │
│ ───────────────────────────────│
│                                │
│  💡 DICA DE USO                │
│  Cole este prompt no ChatGPT,  │
│  Claude ou Gemini e descreva   │
│  seu problema logo em seguida. │
│                                │
└────────────────────────────────┘
4.3 Conteúdo dos Prompts (Referência)
Os prompts serão importados diretamente do documento [Toolkit de Prompts - Unimed.md](file:///Users/Ravi/Documents/2ndBrain/Projetos/Clientes/Unimed/Toolkit%20de%20Prompts%20-%20Unimed.md):

Agente	Prompt ID	Fase S.E.I.
O Tradutor de Realidade	agente_1_tradutor	Situação
O Navegador de Contexto	agente_2_navegador	Evidências
A Bússola de Autonomia	agente_3_bussola	Pré-Intervenção
O Designer de Ação	agente_4_designer	Intervenção
5. TELA: HISTÓRICO
5.1 Lista de Sessões
┌────────────────────────────────┐
│ ←  HISTÓRICO                   │
├────────────────────────────────┤
│                                │
│  🔍 Buscar sessão...           │
│                                │
│  ──────── ESTA SEMANA ───────  │
│                                │
│  ┌──────────────────────────┐  │
│  │ 📋 Atraso em Compras     │  │
│  │ Há 2 horas • Em progresso│  │
│  │ ▸ Situação ✓             │  │
│  │ ▸ Evidências ◐           │  │
│  │ ▸ Intervenção ○          │  │
│  └──────────────────────────┘  │
│                                │
│  ┌──────────────────────────┐  │
│  │ 📋 Glosas da ANS         │  │
│  │ Ontem • Concluído        │  │
│  │ ▸ Situação ✓             │  │
│  │ ▸ Evidências ✓           │  │
│  │ ▸ Intervenção ✓          │  │
│  │                     [📤] │  │
│  └──────────────────────────┘  │
│                                │
│  ──────── SEMANA PASSADA ────  │
│                                │
│  ┌──────────────────────────┐  │
│  │ 📋 Reclamação de Cliente │  │
│  │ 5 dias atrás • Concluído │  │
│  └──────────────────────────┘  │
│                                │
└────────────────────────────────┘
5.2 Indicadores de Progresso
Ícone	Significado
○	Campo vazio
◐	Campo parcialmente preenchido
✓	Campo completo
6. FLUXO DE ONBOARDING
6.1 Primeira Abertura do App
graph TD
    A[Splash Screen] --> B[Tela de Boas-Vindas]
    B --> C{Participou do Workshop?}
    
    C -->|Sim| D[Tutorial Rápido: 3 telas]
    C -->|Não| E[Tutorial Completo: 5 telas]
    
    D --> F[Home]
    E --> F
6.2 Telas de Tutorial
Tela	Título	Conteúdo
1	"Bem-vindo, Operador de Sintonia"	Explicação da metáfora Ruído → Sinal
2	"Seu Canvas é seu Mapa"	Mostrar campos do Canvas S.E.I.
3	"O Co-Piloto te Guia"	Explicar que o chat preenche o Canvas
4	"Toolkit para Levar"	Mostrar seção Docs
5	"Comece Agora"	CTA para primeira sessão
7. ESPECIFICAÇÕES TÉCNICAS
7.1 Stack Recomendada
Camada	Tecnologia	Justificativa
Frontend	Next.js + React	SSR, PWA nativo
UI	Tailwind CSS + Radix	Mobile-first, acessível
Estado	Zustand	Leve, persistência fácil
Chat	Dify API	Já configurado com Mega Prompt
Storage	LocalStorage + IndexedDB	Offline-first
Export	html2canvas + jsPDF	Geração de PDF/PNG
7.2 Modelo de Dados
interface CanvasState {
  id: string;
  created_at: Date;
  updated_at: Date;
  title: string; // Gerado automaticamente ou pelo usuário
  status: 'draft' | 'in_progress' | 'completed';
  
  situacao: {
    cena: TextField;
    impacto: TextField;
  };
  
  evidencias: {
    dados: TextField;
    hipoteses: ListField;
    tipo_problema: RadioField;
  };
  
  intervencao: {
    acao: TextField;
    autonomia: RadioField;
    proximo_passo: TextField;
  };
}

interface TextField {
  value: string;
  source: 'manual' | 'ai';
  validated: boolean;
  updated_at: Date;
}

interface ListField {
  items: Array<{
    value: string;
    source: 'manual' | 'ai';
  }>;
}

interface RadioField {
  value: string | null;
  source: 'manual' | 'ai';
}

interface ChatSession {
  id: string;
  canvas_id: string;
  messages: Message[];
  created_at: Date;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  canvas_updates?: CanvasUpdate[];
  timestamp: Date;
}

interface CanvasUpdate {
  field: string;
  value: string;
  accepted: boolean | null;
}
7.3 API Dify — Configuração
# Variáveis de ambiente
DIFY_API_URL: "https://api.dify.ai/v1"
DIFY_API_KEY: "app-xxxxx"
DIFY_APP_ID: "copiloto-analitico-unimed"

# Headers padrão
Authorization: "Bearer ${DIFY_API_KEY}"
Content-Type: "application/json"

# Endpoint de Chat
POST /chat-messages
{
  "inputs": {
    "canvas_state": "<JSON do Canvas atual>"
  },
  "query": "<Mensagem do usuário>",
  "user": "<ID anônimo>",
  "conversation_id": "<ID da sessão ou null>"
}
7.4 PWA Configuration
// manifest.json
{
  "name": "Co-Piloto Analítico Unimed",
  "short_name": "Co-Piloto",
  "description": "Do Ruído à Transmissão",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0f172a",
  "theme_color": "#4b8c99",
  "icons": [
    {
      "src": "/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
8. FLUXOS DE USO
8.1 Fluxo Primário: Resolver Problema com Canvas
sequenceDiagram
    actor U as Usuário
    participant H as Home
    participant C as Chat + Canvas
    participant D as Dify API
    participant S as Storage
    
    U->>H: Abre o app
    H->>U: Mostra opções de fase
    U->>H: Clica "Situação"
    H->>C: Abre Chat + Canvas
    C->>D: Inicia conversa (contexto: Canvas vazio)
    D->>C: "Qual desafio você quer colocar na mesa?"
    U->>C: Descreve problema
    C->>D: Envia mensagem + Canvas state
    D->>C: Resposta + [CANVAS_UPDATE]
    C->>U: Mostra sugestão de preenchimento
    U->>C: Aceita sugestão
    C->>S: Salva Canvas atualizado
    
    loop Diálogo Socrático
        D->>C: Pergunta reflexiva
        U->>C: Responde
        C->>D: Envia + Canvas state
        D->>C: Atualiza Canvas se aplicável
    end
    
    U->>C: Clica [Exportar PDF]
    C->>U: Baixa documento
8.2 Fluxo Secundário: Copiar Prompt do Toolkit
sequenceDiagram
    actor U as Usuário
    participant D as Docs
    participant P as Prompt Detail
    participant E as App Externo (ChatGPT)
    
    U->>D: Abre aba Docs
    D->>U: Lista de Agentes
    U->>D: Clica "Agente 2"
    D->>P: Abre detalhe
    P->>U: Mostra prompt + dica de uso
    U->>P: Clica [Copiar]
    P->>U: Toast "Copiado!"
    U->>E: Cola no ChatGPT
    E->>U: Inicia diálogo Socrático
9. MÉTRICAS DE SUCESSO
9.1 KPIs de Engajamento
Métrica	Meta (30 dias)	Como medir
DAU (Daily Active Users)	30% dos participantes	Analytics
Sessões/Usuário	≥ 3 por semana	LocalStorage
Canvas Concluídos	≥ 1 por usuário	Estado do Canvas
Prompts Copiados	≥ 5 por usuário	Evento de click
Tempo Médio/Sessão	8-12 min	Analytics
9.2 KPIs de Qualidade
Métrica	Meta	Como medir
Taxa de Aceitação IA	≥ 70%	Clicks em [Aceitar]
Canvas Exportados	≥ 30% dos concluídos	Evento de export
NPS do App	≥ 8	Pesquisa pós-workshop
10. ROADMAP DE IMPLEMENTAÇÃO
Fase 1: MVP para Workshop (Semana 1)
[ ] Estrutura Next.js + Tailwind
[ ] Tela Home com 4 botões de fase
[ ] Chat básico com Dify
[ ] Canvas estático (só visualização)
[ ] Seção Docs com prompts
Fase 2: Canvas Interativo (Semana 2)
[ ] Campos editáveis do Canvas
[ ] Sincronização Canvas ↔ Chat
[ ] Parsing de [CANVAS_UPDATE]
[ ] Sugestões de preenchimento
[ ] Salvamento local
Fase 3: Polish & Export (Semana 3)
[ ] Exportar PDF/PNG
[ ] Histórico de sessões
[ ] PWA + instalação
[ ] Onboarding tutorial
[ ] Testes com turma piloto
11. ANEXOS
A. Paleta de Cores
:root {
  /* Backgrounds */
  --bg-primary: #0f172a;    /* Slate 900 */
  --bg-secondary: #1e293b;  /* Slate 800 */
  --bg-surface: #334155;    /* Slate 700 */
  
  /* Accent */
  --accent-primary: #4b8c99;  /* Turquesa Workshop */
  --accent-hover: #5da3b1;
  
  /* Text */
  --text-primary: #f8fafc;   /* Slate 50 */
  --text-secondary: #94a3b8; /* Slate 400 */
  
  /* Status */
  --success: #22c55e;
  --warning: #eab308;
  --error: #ef4444;
  
  /* Canvas */
  --canvas-bg: #f2efeb;      /* Creme do workshop */
  --canvas-border: #1e293b;
}
B. Tipografia
:root {
  --font-heading: 'Anton', sans-serif;
  --font-body: 'Inter', sans-serif;
  --font-mono: 'Roboto Mono', monospace;
}
C. Referências de Design
[Toolkit de Prompts](file:///Users/Ravi/Documents/2ndBrain/Projetos/Clientes/Unimed/Toolkit%20de%20Prompts%20-%20Unimed.md)
[Mega Prompt Dify](file:///Users/Ravi/Documents/2ndBrain/Projetos/Clientes/Unimed/Mega%20Prompt%20Dify%20-%20Unimed.md)
[Workshop Completo](file:///Users/Ravi/Documents/2ndBrain/Projetos/Clientes/Unimed/Workshop%20Pensamento%20Anal%C3%ADtico%20e%20Resolu%C3%A7%C3%A3o%20de%20Problemas%20Complexos%20%28Unimed%29%20.md)
Documento de Especificações — WebApp Co-Piloto Analítico
Versão 1.0 — Janeiro 2026