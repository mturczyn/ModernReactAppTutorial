import { useContext } from 'react'
import { TasksContext } from './TaskContexts'
import TaskItem from './TaskItem'

export default function TaskList() {
  const tasks = useContext(TasksContext)

  return (
    <div>
      <ul>
        {tasks.map((t: any) => (
          <li key={t.id}>
            <TaskItem task={t} />
          </li>
        ))}
      </ul>
    </div>
  )
}
