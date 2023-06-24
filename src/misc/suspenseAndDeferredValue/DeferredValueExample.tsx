import { Suspense, useState, useDeferredValue } from 'react'
import { FetchDataErrorBoundary } from './FetchDataErrorBoundary'
import { WORKING_URL_FOR_HTTP_GET } from './SuspenseExampleWithSuspensibleComponent'
import { StatusDisplayerWithErrorHandling } from './StatusDisplayerWithErrorHandling'

export function DeferredValueExample() {
  const [query, setQuery] = useState(WORKING_URL_FOR_HTTP_GET)
  const deferredQuery = useDeferredValue(query)

  return (
    <div>
      <p>
        This is an example of deferred value hook. It should show stale (old)
        values when we are rendering new component which waits for data in order
        to render (suspensible component wrapped in Suspense). However, we won't
        see suspense fallback, but old values instead thanks to deferred value.
      </p>
      <h4 style={{ color: 'red' }}>This for some reason is not working</h4>
      <p style={{ color: 'red' }}>
        This is most probably to custom suspensible component. More on this hook
        can be found here:
      </p>
      <a
        style={{ color: 'red' }}
        href='https://react.dev/reference/react/useDeferredValue'
      >
        React useDeferredValue doc
      </a>
      <p>
        <b>Working URL {WORKING_URL_FOR_HTTP_GET}</b>
      </p>
      <button onClick={() => setQuery(WORKING_URL_FOR_HTTP_GET)}>
        Set Working URL
      </button>
      <br />
      <label>
        URL:
        <input
          value={query}
          onChange={(e: any) => setQuery(e.target.value)}
        />
      </label>
      <Suspense fallback={<h2>Loading status...</h2>}>
        <FetchDataErrorBoundary>
          <StatusDisplayerWithErrorHandling url={deferredQuery} />
        </FetchDataErrorBoundary>
      </Suspense>
    </div>
  )
}
