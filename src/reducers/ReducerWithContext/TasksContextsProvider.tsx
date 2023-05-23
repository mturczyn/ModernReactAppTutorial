import { useImmerReducer } from 'use-immer'
import { TasksContext, TasksDispatchContext } from './TaskContexts'
import { tasksReducer } from './tasksReducer'
import { useContext } from 'react'

export default function TasksContextsProvider({ children }: any) {
  const [tasks, dispatch] = useImmerReducer(tasksReducer, initialTasks)

  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
        {children}
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  )
}

const initialTasks = [
  { id: 0, text: 'Visit Kafka Museum', done: true },
  { id: 1, text: 'Watch a puppet show', done: false },
  { id: 2, text: 'Lennon Wall pic', done: false },
]

export function useTasksContext() {
  return useContext(TasksContext)
}

export function useTasksDispatchContext() {
  return useContext(TasksDispatchContext)
}
