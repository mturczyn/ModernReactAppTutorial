import { useState } from 'react'

export default function ResttingState() {
  return (
    <>
      <div>
        <p>
          This component has wrong update logic, as same score is preserved
          between players. This because we render exact same HTML tree and React
          is unable to distinguish between counters. Adding key property might
          solve the issue.
        </p>
        <Scoreboard />
        <p>
          Below we try to solve the issue by rendering to different counter
          conditionally. It leads to destroying one element in DOM and creating
          the other one.
        </p>
        <ScoreboardButDifferentPositionInTree />
      </div>
      <div>
        <p>
          Here we render entire Chat component with key set to id of particular
          person. With this trick we easily re-render entire chat when person
          changes and reset Chat with new state.
        </p>
        <Messenger />
      </div>
      <div>
        <p>
          Here we use index as key when we render a list. This leads to bug that
          when we expand first item, it stays expanded (first item), no matter
          what order.
        </p>
        <EnhancedOrderableContactListWithKeyPitfall />
      </div>
    </>
  )
}

const contacts = [
  { id: 0, name: 'Taylor', email: 'taylor@gmail.com' },
  { id: 1, name: 'Alice', email: 'alice@gmail.com' },
  { id: 2, name: 'Bob', email: 'bob@gmail.com' },
]

function Contact({ contact }: { contact: any }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <>
      <p>
        <b>{contact.name}</b>
      </p>
      {expanded && (
        <p>
          <i>{contact.email}</i>
        </p>
      )}
      <button
        onClick={() => {
          setExpanded(!expanded)
        }}
      >
        {expanded ? 'Hide' : 'Show'} email
      </button>
    </>
  )
}

function EnhancedOrderableContactListWithKeyPitfall() {
  const [reverse, setReverse] = useState(false)

  const displayedContacts = [...contacts]
  if (reverse) {
    displayedContacts.reverse()
  }

  return (
    <>
      <label>
        <input
          type='checkbox'
          value={reverse.toString()}
          onChange={e => {
            setReverse(e.target.checked)
          }}
        />{' '}
        Show in reverse order
      </label>
      <ul>
        {displayedContacts.map((contact, i) => (
          <li key={i}>
            <Contact contact={contact} />
          </li>
        ))}
      </ul>
    </>
  )
}

function Chat({ contact }: { contact: any }) {
  const [text, setText] = useState('')
  return (
    <section>
      <textarea
        value={text}
        placeholder={'Chat to ' + contact.name}
        onChange={(e: any) => setText(e.target.value)}
      />
      <br />
      <button>Send to {contact.email}</button>
    </section>
  )
}

function ContactList({
  selectedContact,
  contacts,
  onSelect,
}: {
  selectedContact: any
  contacts: any
  onSelect: any
}) {
  return (
    <section>
      <ul>
        {contacts.map((contact: any) => (
          <li key={contact.id}>
            <button onClick={() => onSelect(contact)}>{contact.name}</button>
          </li>
        ))}
      </ul>
    </section>
  )
}

function Messenger() {
  const [to, setTo] = useState(contacts[0])

  return (
    <div>
      <ContactList
        contacts={contacts}
        selectedContact={to}
        onSelect={(contact: any) => setTo(contact)}
      />
      <Chat
        key={to.id}
        contact={to}
      />
    </div>
  )
}

function ScoreboardButDifferentPositionInTree() {
  const [isPlayerA, setIsPlayerA] = useState(true)
  return (
    <div>
      {isPlayerA && <Counter person='Taylor' />}
      {!isPlayerA && <Counter person='Sarah' />}
      <button
        onClick={() => {
          setIsPlayerA(!isPlayerA)
        }}
      >
        Next player!
      </button>
    </div>
  )
}

function Scoreboard() {
  const [isPlayerA, setIsPlayerA] = useState(true)
  return (
    <div>
      {isPlayerA ? <Counter person='Taylor' /> : <Counter person='Sarah' />}
      <button
        onClick={() => {
          setIsPlayerA(!isPlayerA)
        }}
      >
        Next player!
      </button>
    </div>
  )
}

function Counter({ person }: { person: any }) {
  const [score, setScore] = useState(0)
  const [hover, setHover] = useState(false)

  let className = 'counter'
  if (hover) {
    className += ' hover'
  }

  return (
    <div
      className={className}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <h1>
        {person}'s score: {score}
      </h1>
      <button onClick={() => setScore(score + 1)}>Add one</button>
    </div>
  )
}
