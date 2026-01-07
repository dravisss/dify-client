import type { FC } from 'react'
import React from 'react'
import {
  Bars3Icon,
} from '@heroicons/react/24/solid'
import AppIcon from '@/app/components/base/app-icon'
export interface IHeaderProps {
  title: string
  isMobile?: boolean
  onShowSideBar?: () => void
  onCreateNewChat?: () => void
  onShowCanvas?: () => void
}
const Header: FC<IHeaderProps> = ({
  title,
  isMobile,
  onShowSideBar: _onShowSideBar,
  onCreateNewChat: _onCreateNewChat,
  onShowCanvas,
}) => {
  return (
    <div className="shrink-0 flex items-center justify-between h-12 px-3 bg-gray-100 border-b border-gray-200">
      {isMobile
        ? (
          <div
            className='flex items-center justify-center h-8 w-8 cursor-pointer hover:bg-gray-200 rounded-lg transition-colors'
            onClick={() => onShowCanvas?.()}
          >
            <Bars3Icon className="h-5 w-5 text-gray-500" />
          </div>
        )
        : <div></div>}
      <div className='flex items-center space-x-2'>
        <AppIcon size="small" />
        <div className="text-sm text-gray-800 font-bold">{title}</div>
      </div>
      {isMobile
        ? (
          <div className="flex items-center gap-1">
          </div>)
        : <div></div>}
    </div>
  )
}

export default React.memo(Header)
