import { useState, useRef } from 'react'

export default function ToggleMessage({ message }: any) {
  const [show, setShow] = useState(true)
  const ref = useRef(null)

  return (
    <div>
      <button onClick={() => setShow(!show)}>Toggle with setState</button>
      <button onClick={() => (ref.current! as HTMLElement).remove()}>
        Remove element from the DOM
      </button>
      {show && <p ref={ref}>{message}</p>}
    </div>
  )
}
