import { Suspense, useState } from 'react'
import { FetchDataErrorBoundary } from './FetchDataErrorBoundary'
import { StatusDisplayerWithErrorHandling } from './StatusDisplayerWithErrorHandling'
import { StatusDisplayer } from './StatusDisplayer'

export const WORKING_URL_FOR_HTTP_GET =
  'https://jsonplaceholder.typicode.com/todos/1'

export default function SuspenseExampleWithSuspensibleComponent() {
  const [query, setQuery] = useState(WORKING_URL_FOR_HTTP_GET)
  const [showWithBetterErrorHandling, setShowWithBetterErrorHandling] =
    useState(false)

  return (
    <div>
      <p>
        Below component has implemented loading indication using suspense.
        Suspense component is able to "await" component loading (if it was
        define with React.lazy or when we have "suspensible" component). We have
        implemented suspensible component that "suspends" each time it makes
        HTTP request, triggered by changing URL. In detail, the component
        "throws promise" it is awaiting as error, which then Suspense catches
        and awaits, allowing child component to access already resolved
        (awaited) promise.
      </p>
      <label>
        Show status with better error handling:
        <input
          checked={showWithBetterErrorHandling}
          onChange={(e: any) =>
            setShowWithBetterErrorHandling(e.target.checked)
          }
          type='checkbox'
        />
      </label>
      <br />
      <p>
        <b>Working URL {WORKING_URL_FOR_HTTP_GET}</b>
      </p>
      <button onClick={() => setQuery(WORKING_URL_FOR_HTTP_GET)}>
        Set Working URL
      </button>
      <button
        onClick={() =>
          setQuery(
            // Cut after first dot to force invalid domain, which will also take some time to
            // load, which also presents greatly Suspense in action.
            WORKING_URL_FOR_HTTP_GET.substring(
              0,
              WORKING_URL_FOR_HTTP_GET.indexOf('.') + 1
            )
          )
        }
      >
        Set Example-Not-Working URL
      </button>
      <br />
      <label>
        URL:
        <input
          value={query}
          onChange={(e: any) => setQuery(e.target.value)}
        />
      </label>
      <Suspense
        key={query}
        fallback={<h2>Loading from HTTP request...</h2>}
      >
        {showWithBetterErrorHandling ? (
          <StatusDisplayerWithErrorHandling url={query} />
        ) : (
          <FetchDataErrorBoundary>
            <StatusDisplayer url={query} />
          </FetchDataErrorBoundary>
        )}
      </Suspense>
    </div>
  )
}
