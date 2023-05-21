import { useState } from 'react'

export function ResettingStatePitfall() {
  return (
    <div>
      <p>
        Below is example where we define component as internal function to
        another function component. And so each inside each render "new"
        component is created and so, it gets new state. As a consequence,
        entered text will reset.
      </p>
      <MyComponent />
    </div>
  )
}

function MyComponent() {
  const [counter, setCounter] = useState(0)

  function MyTextField() {
    const [text, setText] = useState('')
    return (
      <input
        value={text}
        onChange={e => setText(e.target.value)}
      />
    )
  }

  return (
    <>
      <MyTextField />
      <button onClick={() => setCounter(counter + 1)}>Counter {counter}</button>
    </>
  )
}
