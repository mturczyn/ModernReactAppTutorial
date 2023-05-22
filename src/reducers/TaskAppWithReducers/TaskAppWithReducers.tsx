import { useState, useReducer } from 'react'
import { tasksReducer, TasksActions } from './tasksReducer'
import { useImmerReducer } from 'use-immer'

function TaskList({
  tasks,
  onChangeTask,
  onDeleteTask,
}: {
  tasks: any
  onChangeTask: any
  onDeleteTask: any
}) {
  return (
    <div>
      <ul>
        {tasks.map((t: any) => (
          <li key={t.id}>
            <TaskItem
              initialText={t.text}
              onChangeText={(newText: any) =>
                onChangeTask({ ...t, text: newText })
              }
              onDeleteTask={() => onDeleteTask(t.id)}
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

function AddTask({ onAddTask }: { onAddTask: any }) {
  const [text, setText] = useState('')
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
        onClick={() => onAddTask(text)}
      >
        Add
      </button>
    </div>
  )
}

export default function TaskAppWithReducers() {
  const [tasks, dispatch] = useImmerReducer(tasksReducer, initialTasks)

  function handleAddTask(text: any) {
    dispatch({ type: TasksActions.Added, id: nextId++, text: text })
  }

  function handleChangeTask(task: any) {
    dispatch({ type: TasksActions.Changed, task: task })
  }

  function handleDeleteTask(taskId: any) {
    dispatch({ type: TasksActions.Deleted, id: taskId })
  }

  return (
    <>
      <h1>Prague itinerary</h1>
      <AddTask onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </>
  )
}

let nextId = 3
const initialTasks = [
  { id: 0, text: 'Visit Kafka Museum', done: true },
  { id: 1, text: 'Watch a puppet show', done: false },
  { id: 2, text: 'Lennon Wall pic', done: false },
]
