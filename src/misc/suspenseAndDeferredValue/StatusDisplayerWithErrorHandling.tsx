import { useEffect, useState } from 'react'
import useTryFetchData from './useTryFetchData'

export function StatusDisplayerWithErrorHandling({ url }: any) {
  const [responseData, setResponseData] = useState<any>(null)
  const [showDetails, setShowDetails] = useState(true)

  const { read } = useTryFetchData(url)
  // Here we are leveraging all capabilities of Suspense
  // as here we are calling method that will throw promise,
  // which then will be resolved by Suspense component.
  const data = read && read()

  useEffect(() => {
    console.log('>>>', 'data', data)
    setResponseData(data)
  }, [data])

  const showDetailsBtn = (
    <button onClick={() => setShowDetails(!showDetails)}>
      {showDetails ? 'Hide' : 'Show'} details
    </button>
  )

  const isSuccess = responseData?.isSuccess ?? true
  const successContent = () => (
    <>
      <h3>Response status code was {data?.status}, response body:</h3>
      {showDetailsBtn}
      {showDetails && <p>{JSON.stringify(responseData?.content, null, 2)}</p>}
    </>
  )

  const errorContent = () => (
    <div style={{ color: 'red' }}>
      <h3>There was error while fetching data. Details:</h3>
      {showDetailsBtn}
      {showDetails && (
        <>
          <p>{responseData?.error}</p>
          <p>More can be seen in browser's console.</p>
        </>
      )}
    </div>
  )

  return isSuccess ? successContent() : errorContent()
}
