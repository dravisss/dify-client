'use client'

import type { FC } from 'react'
import React, { useEffect } from 'react'

const App: FC<any> = () => {
  useEffect(() => {
    window.location.href = 'https://udify.app/chat/ql1utSItKuu5Rm0i'
  }, [])

  return (
    <div className="flex h-screen w-full items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-2">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600"></div>
        <p className="text-sm text-gray-500 font-medium">Redirecionando para o App...</p>
      </div>
    </div>
  )
}

export default React.memo(App)
