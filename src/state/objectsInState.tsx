import { useState } from 'react'
import { useImmer } from 'use-immer'

interface Person {
  firstname: string
  lastname: string
  details: {
    age: number
    footsize: number
    lovepets: boolean
  }
}

function PersonView(person: Person) {
  const [showDetails, setShowDetails] = useState(false)
  return (
    <div>
      <p>First name: {person.firstname}</p>
      <p>Last name: {person.lastname}</p>
      <button onClick={() => setShowDetails(x => !x)}>
        {showDetails ? 'Hide' : 'Show'} details
      </button>
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

export function UpdatingObjectsWithSpreadSyntax() {
  const [person, setPerson] = useState<Person>({
    firstname: 'michal',
    lastname: 'turczyn',
    details: {
      age: 20,
      footsize: 44,
      lovepets: true,
    },
  })

  const [otherPerson, updateOtherPerson] = useImmer({
    firstname: 'other michal',
    lastname: 'other turczyn',
    details: {
      age: 20,
      footsize: 44,
      lovepets: true,
    },
  })

  // Here we use nested spread syntax to change only one property in nested object in state object
  const changeLovingPets = () => {
    setPerson(p => ({
      ...p,
      details: { ...p.details, lovepets: !p.details.lovepets },
    }))
  }

  // Here is more concise version of updating using Immer package.
  const changeOtherPersonLovingPets = () => {
    const currentLovePets = otherPerson.details.lovepets
    updateOtherPerson(draft => {
      draft.details.lovepets = !currentLovePets
    })
  }

  return (
    <div>
      <button onClick={changeLovingPets}>Change loving pets</button>
      <PersonView {...person} />

      <button onClick={changeOtherPersonLovingPets}>
        Change other loving pets
      </button>
      <PersonView {...otherPerson} />
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
