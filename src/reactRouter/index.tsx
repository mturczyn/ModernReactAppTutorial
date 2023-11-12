import { useState } from 'react'
import { Link, Route, Routes, useParams } from 'react-router-dom'

export function ReactRouterExamples() {
  const [param, setParam] = useState('')

  return (
    <div>
      <h1>React router examples</h1>
      <h2>Dynamic routing</h2>
      <p>
        Below we have dynamic routing, this page registers additional route
        using params, use privded link and verify address in the search bar:
      </p>
      <label>
        Set param
        <input
          value={param}
          onChange={e => setParam(e.target.value)}
        />
      </label>
      <Link to={param}>Navigate to {param}</Link>
      <Routes>
        <Route
          path=':param'
          element={<JustExampleComponent />}
        />
      </Routes>
      <p>
        Above the new route is defined and component defined for that route will
        be rendered in place of that <code>Route</code> component.
      </p>
      <Link to='hello/world'>Navigate to hello/world</Link>
      <Routes>
        <Route
          path=':param1/:param2'
          element={<JustExampleComponent />}
        />
      </Routes>
    </div>
  )
}

function JustExampleComponent() {
  const params = useParams()
  return (
    <div style={{ border: '1px solid currentColor', padding: '1rem' }}>
      <h1>This is child component defined for a dynamic route</h1>
      <p>Example component, passed parameter is {JSON.stringify(params)}</p>
    </div>
  )
}
