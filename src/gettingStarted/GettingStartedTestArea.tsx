import { useState } from 'react'

function MyButton() {
  const [count, setCount] = useState(1)

  function handleClick() {
    setCount(count + 1)
  }

  return <button onClick={handleClick}>Clicked {count} times</button>
}

function MyButtonControlled(props: { count: number; onClick: () => void }) {
  return <button onClick={props.onClick}>Clicked {props.count} times</button>
}

function MultiButtonsOneCounter() {
  const [count, setCount] = useState(0)
  const [btns, setBtns] = useState<{ name: string }[]>([])

  return (
    <div>
      <p>
        Below buttons should have one counter that should be updated from any
        button
      </p>
      <button onClick={() => setBtns([...btns, { name: 'BTN' }])}>
        Add buttons with shared counter
      </button>
      <button onClick={() => setBtns(btns.splice(1))}>
        Remove buttons with shared counter
      </button>
      <ul>
        {btns.map(x => (
          <li>
            <MyButtonControlled
              count={count}
              onClick={() => setCount(count + 1)}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function GettingStarted() {
  return (
    <div>
      <MyButton />
      <MultiButtonsOneCounter />
    </div>
  )
}
