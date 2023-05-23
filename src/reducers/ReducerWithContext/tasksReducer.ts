export const TasksActions = {
  Added: 'added',
  Changed: 'changed',
  Deleted: 'deleted',
}

export function tasksReducer(draft: any, action: any) {
  switch (action.type) {
    case TasksActions.Added: {
      draft.push({
        id: action.id,
        text: action.text,
        done: false,
      })
      break
    }
    case TasksActions.Changed: {
      const index = draft.findIndex((t: any) => t.id == action.task.id)
      draft[index] = action.task
      break
    }
    case TasksActions.Deleted: {
      return draft.filter((t: any) => t.id !== action.id)
    }
    default: {
      throw Error('Unknown action: ' + action.type)
    }
  }
}
