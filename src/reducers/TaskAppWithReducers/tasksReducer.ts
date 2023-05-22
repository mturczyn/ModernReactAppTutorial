export const TasksActions = {
  Added: 'added',
  Changed: 'changed',
  Deleted: 'deleted',
}

/**
 * Commented code is before refactoring to use immer for more
 * concise syntax (without spread ...).
 * @param draft
 * @param action
 * @returns
 */
export function tasksReducer(draft: any, action: any) {
  switch (action.type) {
    case TasksActions.Added: {
      draft.push({
        id: action.id,
        text: action.text,
        done: false,
      })
      break
      //   return [
      //     ...tasks,
      //     {
      //       id: action.id,
      //       text: action.text,
      //       done: false,
      //     },
      //   ]
    }
    case TasksActions.Changed: {
      const index = draft.findIndex((t: any) => t.id == action.task.id)
      draft[index] = action.task
      break
      //   return tasks.map((t: any) => {
      //     if (t.id === action.task.id) {
      //       return action.task
      //     } else {
      //       return t
      //     }
      //   })
    }
    case TasksActions.Deleted: {
      return draft.filter((t: any) => t.id !== action.id)
      //   return tasks.filter((t: any) => t.id !== action.id)
    }
    default: {
      throw Error('Unknown action: ' + action.type)
    }
  }
}
