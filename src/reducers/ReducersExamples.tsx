import TaskApp from './TaskApp'
import TaskAppWithReducers from './TaskAppWithReducers/TaskAppWithReducers'

export default function ReducersExamples() {
  return (
    <div style={{ margin: '1rem' }}>
      <p>Below task application is written without reducers.</p>
      <TaskApp />
      <p>
        Below task application is written with use of reducers. All event
        handlers are defined in separate reducer file, to separate event
        handling logic from view file.
      </p>
      <TaskAppWithReducers />
    </div>
  )
}
