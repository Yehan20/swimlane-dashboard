'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'

import {
  type TaskStore,
  createTaskStore,
  initTaskStore,
} from '../store/useTaskStore' // adjust path

export type TaskStoreApi = ReturnType<typeof createTaskStore>

// create context to share between application
const TaskStoreContext = createContext<TaskStoreApi | undefined>(undefined)

export const TaskStoreProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const storeRef = useRef<TaskStoreApi | null>(null)

  // make a new store if store is null
  if (storeRef.current === null) {
    storeRef.current = createTaskStore(initTaskStore())
  }

  return (
    <TaskStoreContext.Provider value={storeRef.current}>
      {children}
    </TaskStoreContext.Provider>
  )
}

// custom hook to access data and methhods from our store
export const useTaskStore = <T,>(
  selector: (store: TaskStore) => T
): T => {
  const store = useContext(TaskStoreContext)
  if (!store) {
    throw new Error(`useTaskStore must be used within TaskStoreProvider`)
  }
  return useStore(store, selector)
}
