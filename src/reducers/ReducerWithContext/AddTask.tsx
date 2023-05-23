import { useState } from 'react'
import { TasksActions } from './tasksReducer'
import { useTasksDispatchContext } from './TasksContextsProvider'

let nextId = 3

export default function AddTask() {
  const [text, setText] = useState('')
  const dispatch = useTasksDispatchContext()

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
