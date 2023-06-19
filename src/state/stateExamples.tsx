import { useState } from 'react'
import {
  ObjectInStateInvalidExample,
  UpdatingObjectsWithSpreadSyntax,
} from './objectsInState'
import { PeopleList } from './arraysInState'
import { ResettingStatePitfall } from './resettingStatePitfall'
import ResttingState from './resettingState'

export function StateExamples() {
  return (
    <div className='examplesContainer'>
      <Greet />
      <UnexpectedIncrementBy3 />
      <ObjectInStateInvalidExample />
      <UpdatingObjectsWithSpreadSyntax />
      <PeopleList />
      <ResettingStatePitfall />
      <ResttingState />
    </div>
  )
}

function UnexpectedIncrementBy3() {
  const [number, setNumber] = useState(0)

  function incrementNumberThreeTimes() {
    setNumber(number + 1)
    setNumber(number + 1)
    setNumber(number + 1)
  }

  function incrementNumberByThreeTimesCorrect() {
    setNumber(x => x + 1)
    setNumber(x => x + 1)
    setNumber(x => x + 1)
  }

  return (
    <div>
      <p>This component shows examples of incrementing number value by 3. </p>
      <p>
        First button just sets incremented state three times, which results in
        incrementing the same value three times (so at start we have 0 and we
        increment it three times to 1)
      </p>
      <p>
        Second button uses lambda function to calculate state based on previous
        state value and works correctly.
      </p>
      <h3>Current number is: {number}</h3>
      <button onClick={incrementNumberThreeTimes}>
        Increment by 3 invalid
      </button>
      <button onClick={incrementNumberByThreeTimesCorrect}>
        Increment by 3 correctly
      </button>
    </div>
  )
}

function Greet() {
  const [name, setName] = useState<string | null>('')
  function handleClick() {
    setName(prompt('what is your name?'))
    alert('Hello, ' + name)
  }

  return (
    <div>
      <p>
        This is greet component, which uses state to grab value from prompt and
        immediately show it in alert, whcih does not work
      </p>
      <button onClick={handleClick}>Greet</button>
    </div>
  )
}
