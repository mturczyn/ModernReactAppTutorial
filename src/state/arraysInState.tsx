import { useCallback, useState } from 'react'

let nextId = 0

export function PeopleList() {
  const [people, setPeople] = useState<
    { id: number; name: string; age: number }[]
  >([])
  const [currentName, setCurrentName] = useState('')
  const [currentAge, setCurrentAge] = useState<number>(0)
  const handleAddPerson = useCallback(() => {
    nextId++
    setPeople(p => [...p, { id: nextId, name: currentName, age: currentAge }])
    setCurrentAge(0)
    setCurrentName('')
  }, [setPeople, setCurrentAge, setCurrentName, currentAge, currentName])

  const handleRemovePerson = useCallback(
    (person: { id: number; name: string; age: number }) => {
      setPeople(p => p.filter(x => x.id !== person.id))
    },
    [setPeople]
  )

  return (
    <div>
      <input
        value={currentName}
        onChange={e => setCurrentName(e.target.value)}
      />
      <input
        value={currentAge}
        type='number'
        onChange={e => setCurrentAge(Number.parseInt(e.target.value))}
      />
      <button onClick={handleAddPerson}>Add person</button>
      <ul>
        {people.map(p => (
          <li key={p.id}>
            <span>
              Name: {p.name} Age: {p.age}
            </span>
            <span>
              <button onClick={() => handleRemovePerson(p)}>Remove</button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
