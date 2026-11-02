'use client'

import { useRef, type ReactNode } from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import makeStore from '@/lib/store'

type ProviderProps = {
  children: ReactNode
}

function Provider({ children }: ProviderProps) {
  const storeRef = useRef<ReturnType<typeof makeStore> | null>(null)

  if (!storeRef.current) {
    storeRef.current = makeStore()
  }

  return (
    <ReduxProvider store={storeRef.current}>{children}</ReduxProvider>
  )
}

export default Provider