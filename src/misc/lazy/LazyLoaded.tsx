import { Suspense, lazy, useState } from 'react'

const Greeting = lazy(() => import('./Greeting'))

export function LazyExample() {
  const [showGreeting, setShowGreeting] = useState(false)
  const [name, setName] = useState('')

  return (
    <>
      <p>
        When greeting is shown, it will fetch component from server (can be
        observed in Network tab in dev tools). But it will be cached, so it will
        be loaded only once.
      </p>
      <p>The point of lazy is to defer loading of component.</p>
      <p>
        It also has fallback attribute to provide component to display if
        fetching is taking long.
      </p>
      <label>
        Name:
        <input
          onChange={(e: any) => setName(e.target.value)}
          value={name}
        />
      </label>
      <button onClick={() => setShowGreeting(!showGreeting)}>
        {showGreeting ? 'Hide' : 'Show'}
      </button>
      {showGreeting && (
        <Suspense fallback={<p>Loading...</p>}>
          <Greeting name={name} />
        </Suspense>
      )}
    </>
  )
}
