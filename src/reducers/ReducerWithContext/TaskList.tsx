import { useTasksContext } from './TasksContextsProvider'
import TaskItem from './TaskItem'

export default function TaskList() {
  const tasks = useTasksContext()

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
