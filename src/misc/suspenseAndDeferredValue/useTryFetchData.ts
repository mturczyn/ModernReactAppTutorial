import { useRef, useEffect } from 'react'

export default function useTryFetchData(url: any) {
  const fetchRef = useRef<any>(null)

  useEffect(() => {
    fetchRef.current = tryFetchData(url)
  }, [url])

  return { read: fetchRef.current?.read }
}

function tryFetchData(url: any) {
  let result: any
  let status = 'pending'
  const fetchPromise = tryFetch(url).then((res: any) => {
    status = 'fulfilled'
    result = res
  })
  // This is object that implements "suspensable pattern" in React
  // and can be handled correctly in React by Suspense component.
  return {
    read() {
      switch (status) {
        case 'pending':
          // Suspense is able to catch the promise and resolve (await) it.
          throw fetchPromise
        // Should not be reachable due to tryFetch method
        //case 'error':
        // This should be handled by error boundary.
        // return result
        default:
          // When promise resolves without errors, we just return the result.
          return result
      }
    },
  }
}

async function tryFetch(url: any) {
  try {
    const result = await fetch(url)
    const body = await result.json()
    return {
      isSuccess: true,
      status: result.status,
      content: body,
    }
  } catch (error) {
    return { error: String(error), isSuccess: false }
  }
}
