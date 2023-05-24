import { useRef, useState } from 'react'

export function CounterButtonUsingState() {
  const [counter, setCounter] = useState(0)

  return (
    <div>
      Using state:
      <button
        style={{ margin: '0.5rem' }}
        onClick={() => setCounter(counter + 1)}
      >
        Click to increment counter: {counter}
      </button>
    </div>
  )
}

export function CounterButtonUsingRef() {
  const counter = useRef(0)
  const [renderFlag, setRenderFlag] = useState(false)

  return (
    <div style={{ border: '1px solid black' }}>
      Using ref:
      <button
        style={{ margin: '0.5rem' }}
        onClick={() => (counter.current = counter.current + 1)}
      >
        Click to increment counter: {counter.current}
      </button>
      <br />
      <span>Toggle flag to force re-render and see update:</span>
      <button
        style={{ margin: '0.5rem' }}
        onClick={() => setRenderFlag(x => !x)}
      >
        Refresh
      </button>
      Flag is <b>{String(renderFlag)}</b>
    </div>
  )
}
