import { useState } from 'react'

export function UpdatingObjectsWithSpreadSyntax() {
  const [person, setPerson] = useState({
    firstname: 'michal',
    lastname: 'turczyn',
    details: {
      age: 20,
      footsize: 44,
      lovepets: true,
    },
  })
  const [showDetails, setShowDetails] = useState(false)

  // Here we use nested spread syntax to change only one property in nested object in state object
  const changeLovingPets = () => {
    setPerson(p => ({
      ...p,
      details: { ...p.details, lovepets: !p.details.lovepets },
    }))
  }

  return (
    <div>
      <p>First name: {person.firstname}</p>
      <p>Last name: {person.lastname}</p>
      <button onClick={() => setShowDetails(x => !x)}>
        {showDetails ? 'Hide' : 'Show'} details
      </button>
      <button onClick={changeLovingPets}>Change loving pets</button>
      {showDetails && (
        <div>
          <p>Age: {person.details.age}</p>
          <p>Foot size: {person.details.footsize}</p>
          <p>Loves pets: {person.details.lovepets.toString()}</p>
        </div>
      )}
    </div>
  )
}

export function ObjectInStateInvalidExample() {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  function onClick() {
    position.x += 1
    position.y += 1
  }

  return (
    <div>
      <p>
        First button tries to set state by mutating directly object used as
        state, which mutates unerlaying state, but object remains the same and
        so, react does not sees need for re-render (React uses Object.is
        comparison).
      </p>
      <p>
        On the other hand, second button uses set* method to set entire new
        object as state, which we create based on previous state.
      </p>
      <p>
        Try clicking first button couple of times, after that press second
        button, it will now update value more than one.
      </p>
      <button onClick={onClick}>
        Increment coordinates by mutating state object
      </button>
      <button
        onClick={() =>
          setPosition(p => ({
            x: p.x + 1,
            y: p.y + 1,
          }))
        }
      >
        Increment coordinates by using set* method
      </button>
      <p>X={position.x}</p>
      <p>Y={position.y}</p>
    </div>
  )
}
