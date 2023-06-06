import { useState } from 'react'

export default function FormWithCustomHooks() {
  const firstNameProps = useFormInput('Michał')
  const lastNameProps = useFormInput('Turczyn')

  return (
    <>
      <p>
        Below form uses custom hook defined for single input (wrpping logic of
        setting state and setting it with input change handler).
      </p>
      <p>
        It reduces code, as for both input we need exact same state and change
        handler.
      </p>
      <label>
        First Name:
        <input {...firstNameProps} />
      </label>
      <br />
      <label>
        Last Name:
        <input {...lastNameProps} />
      </label>
      <p>
        <b>
          Hello, {firstNameProps.value} {lastNameProps.value}
        </b>
      </p>
    </>
  )
}

function useFormInput(initialValue: any) {
  const [value, setValue] = useState(initialValue)

  function handleChange(e: any) {
    setValue(e.target.value)
  }

  const inputProps = {
    value: value,
    onChange: handleChange,
  }

  return inputProps
}
