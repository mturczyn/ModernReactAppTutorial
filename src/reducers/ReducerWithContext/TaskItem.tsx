import { useState } from 'react'
import { TasksActions } from './tasksReducer'
import { useTasksDispatchContext } from './TasksContextsProvider'

export default function TaskItem({ task }: any) {
  const dispatch = useTasksDispatchContext()
  const [isEdit, setIsEdit] = useState(false)
  const [text, setText] = useState(task.text)

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
            dispatch({
              type: TasksActions.Changed,
              task: {
                ...task,
                text: text,
              },
            })
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
        onClick={(e: any) =>
          dispatch({ type: TasksActions.Deleted, id: task.id })
        }
      >
        Delete
      </button>
    </>
  )
}
