import { useRef, forwardRef } from 'react'

function MyInput(props: any) {
  return <input {...props} />
}

export function MyForm() {
  const inputRef = useRef(null)

  function handleClick() {
    ;(inputRef.current! as HTMLElement).focus()
  }

  return (
    <>
      <MyInput ref={inputRef} />
      <button onClick={handleClick}>Focus input</button>
    </>
  )
}

// If we want to use refs on our components, we must forward the ref from component
// to particular DOM element inside it using forwardRef React function.
const MyInputWithRef = forwardRef((props: any, ref: any) => (
  <input
    {...props}
    ref={ref}
  />
))

export function MyFormWithCorrectRef() {
  const inputRef = useRef(null)

  function handleClick() {
    ;(inputRef.current! as HTMLElement).focus()
  }

  return (
    <>
      <MyInputWithRef ref={inputRef} />
      <button onClick={handleClick}>Focus input</button>
    </>
  )
}
