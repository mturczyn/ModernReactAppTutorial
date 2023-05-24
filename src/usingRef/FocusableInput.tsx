import { useRef } from 'react'

export function FocuasbleInput() {
  const inputRef = useRef(null)
  return (
    <div>
      <input ref={inputRef} />
      <button onClick={() => (inputRef.current! as HTMLElement).focus()}>
        Focus input
      </button>
    </div>
  )
}
