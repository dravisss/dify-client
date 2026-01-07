'use client'

import type { FC, ReactNode } from 'react'
import React from 'react'
import cn from 'classnames'
import { useNavigationStore, type TabId } from '@/stores'

interface TabContentProps {
  children: ReactNode
  className?: string
}

/**
 * Wrapper component that adds bottom padding for the fixed navigation
 */
const TabContent: FC<TabContentProps> = ({ children, className }) => {
  return (
    <div className={cn('pb-16', className)}>
      {children}
    </div>
  )
}

interface TabPanelProps {
  tabId: TabId
  children: ReactNode
  className?: string
}

/**
 * Renders children only when the specified tab is active
 */
const TabPanel: FC<TabPanelProps> = ({ tabId, children, className }) => {
  const { currentTab } = useNavigationStore()

  if (currentTab !== tabId) {
    return null
  }

  return (
    <div className={className}>
      {children}
    </div>
  )
}

export { TabContent, TabPanel }
export default TabContent
