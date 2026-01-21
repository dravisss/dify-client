'use client'

import type { FC } from 'react'
import React from 'react'
import cn from 'classnames'
import { useNavigationStore, type TabId } from '@/stores'

interface NavItem {
  id: TabId
  icon: React.ReactNode
  label: string
}

const ChatIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
)

const DocsIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
)

const HistoryIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
  </svg>
)

const navItems: NavItem[] = [
  { id: 'chat', icon: <ChatIcon />, label: 'Chat' },
  { id: 'docs', icon: <DocsIcon />, label: 'Docs' },
]

interface BottomNavigationProps {
  className?: string
}

const BottomNavigation: FC<BottomNavigationProps> = ({ className }) => {
  const { currentTab, setTab } = useNavigationStore()

  return (
    <nav
      className={cn(
        'flex-shrink-0 w-full',
        'bg-white border-t border-gray-200',
        'flex items-center justify-around',
        'h-14 px-4',
        'safe-area-pb', // Safe area for mobile
        className,
      )}
    >
      {navItems.map((item) => {
        const isActive = currentTab === item.id
        return (
          <button
            key={item.id}
            onClick={() => setTab(item.id)}
            className={cn(
              'flex flex-col items-center justify-center',
              'flex-1 h-full',
              'transition-colors duration-150',
              isActive
                ? 'text-[#4b8c99]'
                : 'text-gray-500 hover:text-gray-700',
            )}
          >
            <span className={cn(
              'transition-transform duration-150',
              isActive && 'scale-110',
            )}>
              {item.icon}
            </span>
            <span className={cn(
              'text-xs mt-1 font-medium',
              isActive ? 'text-[#4b8c99]' : 'text-gray-500',
            )}>
              {item.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}

export default React.memo(BottomNavigation)
