import TaskApp from './TaskApp'
import TaskAppWithReducers from './TaskAppWithReducers/TaskAppWithReducers'
import TaskAppWithReducersWithContext from './ReducerWithContext/TaskAppWithReducersWithContext'

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
      <p>
        Below implementation uses yet one more technique to simplify and better
        organize the code: storing reducer's disptach and state in the context,
        that can be then accessed by any child component and easily dispatch an
        event to handle.
      </p>
      <TaskAppWithReducersWithContext />
    </div>
  )
}
