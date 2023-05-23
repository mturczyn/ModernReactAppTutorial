import TasksContextsProvider from './TasksContextsProvider'
import AddTask from './AddTask'
import TaskList from './TaskList'

export default function TaskAppWithReducersWithContext() {
  return (
    <TasksContextsProvider>
      <h1>Prague itinerary</h1>
      <AddTask />
      <TaskList />
    </TasksContextsProvider>
  )
}
