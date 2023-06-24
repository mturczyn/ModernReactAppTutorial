import { useEffect, useState } from 'react'
import useFetchData from './useFetchData'

export function StatusDisplayer({ url }: any) {
  const [fetchedData, setFetchedData] = useState(0)
  const { read } = useFetchData(url)

  // Here we are leveraging all capabilities of Suspense
  // as here we are calling method that will throw promise,
  // which then will be resolved by Suspense component.
  const data = read && read()

  useEffect(() => {
    setFetchedData(data)
  }, [data])

  return <h3>Response status code was {fetchedData}</h3>
}
