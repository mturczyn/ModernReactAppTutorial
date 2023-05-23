import { useState, useContext } from 'react'
import { tasksReducer, TasksActions } from './tasksReducer'
import { useImmerReducer } from 'use-immer'
import { TasksContext, TasksDispatchContext } from './TaskContexts'

function TaskList() {
  const tasks = useContext(TasksContext)
  const dispatch = useContext(TasksDispatchContext)

  return (
    <div>
      <ul>
        {tasks.map((t: any) => (
          <li key={t.id}>
            <TaskItem
              initialText={t.text}
              onChangeText={(newText: any) =>
                dispatch({
                  type: TasksActions.Changed,
                  task: {
                    ...t,
                    text: newText,
                  },
                })
              }
              onDeleteTask={() =>
                dispatch({ type: TasksActions.Deleted, id: t.id })
              }
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

function TaskItem({
  initialText,
  onChangeText,
  onDeleteTask,
}: {
  initialText: any
  onChangeText: any
  onDeleteTask: any
}) {
  const [isEdit, setIsEdit] = useState(false)
  const [text, setText] = useState(initialText)
  return (
    <>
      <input type='checkbox' />
      {!isEdit && <span style={{ margin: '0.3rem' }}>{text}</span>}
      {isEdit && (
        <input
          style={{ margin: '0.3rem' }}
          value={text}
          onChange={(e: any) => setText(e.target.value)}
        />
      )}
      {isEdit && (
        <button
          style={{ margin: '0.3rem' }}
          onClick={(e: any) => {
            onChangeText(text)
            setIsEdit(false)
          }}
        >
          Save
        </button>
      )}
      {!isEdit && (
        <button
          style={{ margin: '0.3rem' }}
          onClick={(e: any) => setIsEdit(true)}
        >
          Edit
        </button>
      )}
      <button
        style={{ margin: '0.3rem' }}
        onClick={(e: any) => onDeleteTask()}
      >
        Delete
      </button>
    </>
  )
}

function AddTask() {
  const [text, setText] = useState('')
  const dispatch = useContext(TasksDispatchContext)

  return (
    <div>
      <input
        value={text}
        style={{ margin: '0.3rem' }}
        placeholder={'Add task'}
        onChange={(e: any) => setText(e.target.value)}
      />
      <button
        style={{ margin: '0.3rem' }}
        onClick={() =>
          dispatch({ type: TasksActions.Added, id: nextId++, text: text })
        }
      >
        Add
      </button>
    </div>
  )
}

export default function TaskAppWithReducersWithContext() {
  const [tasks, dispatch] = useImmerReducer(tasksReducer, initialTasks)

  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
        <h1>Prague itinerary</h1>
        <AddTask />
        <TaskList />
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  )
}

let nextId = 3
const initialTasks = [
  { id: 0, text: 'Visit Kafka Museum', done: true },
  { id: 1, text: 'Watch a puppet show', done: false },
  { id: 2, text: 'Lennon Wall pic', done: false },
]
