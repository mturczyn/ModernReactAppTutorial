import { useRef, useEffect } from 'react'

export default function useFetchData(url: any) {
  const fetchRef = useRef<any>(null)

  useEffect(() => {
    fetchRef.current = fetchData(url)
  }, [url])

  return fetchRef.current
}

function fetchData(url: any) {
  let result: any
  let status = 'pending'
  console.log('>>>', 'fetching data from', url)
  const fetchPromise = fetch(url).then(
    (res: any) => {
      console.log('>>>', 'fetching data promise fulfilled', res)
      status = 'fulfilled'
      result = res.status
    },
    (error: any) => {
      console.log('>>>', 'fetching data promise rejected', error)
      status = 'rejected'
      result = error
    }
  )
  // This is object that implements "suspensable pattern" in React
  // and can be handled correctly in React by Suspense component.
  return {
    read() {
      switch (status) {
        case 'pending':
          // Suspense is able to catch the promise and resolve (await) it.
          throw fetchPromise
        case 'error':
          // This should be handled by error boundary.
          throw result
        default:
          // When promise resolves without errors, we just return the result.
          return result
      }
    },
  }
}
