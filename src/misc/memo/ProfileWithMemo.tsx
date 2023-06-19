import { useState, useMemo, memo } from 'react'

export function MemoExampleWithUseMemo() {
  const [name, setName] = useState('Michal')
  const [address, setAddress] = useState('Galaxy far away')
  const [age, setAge] = useState(30)
  const [showWithMemoizedProp, setShowWithMemoizedProp] = useState(false)

  const person = useMemo(() => ({ name, age }), [name, age])
  const notMemoPerson = { name, age }

  return (
    <div>
      <p>
        Greeting is memoized component, which uses object as prop, since object
        is ref type, then it would rerender each time, despite memoization.
      </p>
      <p>
        And so even changing address would trigger to rerender memoized
        component. Console log can be seen on each render.
      </p>
      <p>
        In order to fix that we introduced useMemo to also memoize the object
        passed as prop.
      </p>
      <label>
        Name:{' '}
        <input
          value={name}
          onChange={(e: any) => setName(e.target.value)}
        ></input>
      </label>
      <br />
      <label>
        Age:{' '}
        <input
          value={age}
          onChange={(e: any) => setAge(e.target.value)}
        ></input>
      </label>
      <br />
      <label>
        Address:{' '}
        <input
          value={address}
          onChange={(e: any) => setAddress(e.target.value)}
        ></input>
      </label>
      <br />
      <label>
        Show with memoized prop:{' '}
        <input
          type='checkbox'
          checked={showWithMemoizedProp}
          onChange={(e: any) => setShowWithMemoizedProp(e.target.value)}
        ></input>
      </label>
      {showWithMemoizedProp ? (
        <Greeting person={person} />
      ) : (
        <Greeting person={notMemoPerson} />
      )}
    </div>
  )
}

const Greeting = memo(function Greeting({ person }: any) {
  console.log('>>>', 'Rendering greeting in useMemo example')
  return (
    <h3>
      Hello {person.name}, aged {person.age}
    </h3>
  )
})
