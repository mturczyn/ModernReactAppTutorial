import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import { CustomizableHeader } from './customAndContextHooks'
import { useIsOnline } from './useIsOnline'

export default function HooksExample() {
  const notes = `To add state to a component, use one of these Hooks:
 useState - declare a state variable that you can update directly
 useReducer declares a state variable with the update logic inside a reducer function
 
 # Context Hook
 
 useContext reads and subscribes to a context`

  const isOnline = useIsOnline()

  return (
    <div>
      <h1>Learning Hooks</h1>
      <h3>Notes</h3>
      <ReactMarkdown>{notes}</ReactMarkdown>
      <CustomizableHeader />
      <h4>Online status: {isOnline ? 'ON' : 'OFF'}LINE</h4>
    </div>
  )
}

/**
 * To add state to a component, use one of these Hooks:
 * useState - declare a state variable that you can update directly
 * useReducer declares a state variable with the update logic inside a reducer function
 *
 * Context Hook
 *
 * useContext reads and subscribes to a context
 */
