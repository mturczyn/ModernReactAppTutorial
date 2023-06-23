import { Suspense, useEffect, useState, Component } from 'react'
import { useFormInput } from '../../effects/reusingLogicWithCustomHooks'
import useFetchData from './useFetchData'

export default function DeferredValueExample() {
  const queryProps = useFormInput(
    'https://jsonplaceholder.typicode.com/todos/1'
  )

  return (
    <div>
      <p>
        <b>Working URL https://jsonplaceholder.typicode.com/todos/1</b>
      </p>
      <label>
        URL:
        <input {...queryProps} />
      </label>
      <Suspense
        key={queryProps.value}
        fallback={<h2>Loading status...</h2>}
      >
        <ErrorBoundary>
          <StatusDisplayer url={queryProps.value} />
        </ErrorBoundary>
      </Suspense>
    </div>
  )
}

class ErrorBoundary extends Component {
  state: any

  constructor(props: any) {
    super(props)
    this.state = { hasError: false, error: '' }
  }

  componentDidCatch(error: any, info: any) {
    // Display fallback UI
    this.setState({
      hasError: true,
      error: JSON.stringify(error),
      info: JSON.stringify(info),
    })
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div style={{ color: 'red' }}>
          <h3>Something went wrong with fetching data.</h3>
          <p>Error: {this.state.error}</p>
          <p>Details: {this.state.info}</p>
        </div>
      )
    }
    return (this.props as any).children
  }
}

function StatusDisplayer({ url }: any) {
  const [fetchedData, setFetchedData] = useState(0)
  const fetchData = useFetchData(url)

  // Here we are leveraging all capabilities of Suspense
  // as here we are calling method that will throw promise,
  // which then will be resolved by Suspense component.
  const data = fetchData?.read()

  useEffect(() => {
    setFetchedData(data)
  }, [data])

  return <h3>Response status code was {fetchedData}</h3>
}
