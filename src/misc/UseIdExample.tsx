import { useId } from 'react'
import { useFormInput } from '../effects/reusingLogicWithCustomHooks'

export default function UseIdExample() {
  const nameProps = useFormInput('Michal')
  const idComponents = [1, 2, 3, 4, 5, 6, 7].map(x => <IdComponent />)
  return (
    <div>
      <h1>useId example</h1>
      <p>Generated IDs:</p>
      <ul>{idComponents}</ul>
      <input {...nameProps} />
      <p>
        This is used only to cause rerenders to see if ID is stable across
        rerenders.
      </p>
      <h3>Name: {nameProps.value}</h3>
    </div>
  )
}

function IdComponent() {
  const id = useId()
  return <li>{id}</li>
}
