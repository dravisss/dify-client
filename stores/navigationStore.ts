import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type TabId = 'chat' | 'docs' | 'history'

interface NavigationStore {
  currentTab: TabId
  docsSelectedAgent: string | null
  historySelectedSession: string | null
  isCanvasCollapsed: boolean

  // Actions
  setTab: (tab: TabId) => void
  setDocsAgent: (agentId: string | null) => void
  setHistorySession: (sessionId: string | null) => void
  toggleCanvasCollapse: () => void
  setCanvasCollapsed: (collapsed: boolean) => void
}

export const useNavigationStore = create<NavigationStore>()(
  persist(
    set => ({
      currentTab: 'chat',
      docsSelectedAgent: null,
      historySelectedSession: null,
      isCanvasCollapsed: true,

      setTab: (tab: TabId) => {
        set({
          currentTab: tab,
          // Reset sub-selections when changing tabs
          docsSelectedAgent: tab !== 'docs' ? null : undefined,
          historySelectedSession: tab !== 'history' ? null : undefined,
        })
      },

      setDocsAgent: (agentId: string | null) => {
        set({ docsSelectedAgent: agentId })
      },

      setHistorySession: (sessionId: string | null) => {
        set({ historySelectedSession: sessionId })
      },

      toggleCanvasCollapse: () => {
        set(state => ({ isCanvasCollapsed: !state.isCanvasCollapsed }))
      },

      setCanvasCollapsed: (collapsed: boolean) => {
        set({ isCanvasCollapsed: collapsed })
      },
    }),
    {
      name: 'co-piloto-navigation',
    },
  ),
)
