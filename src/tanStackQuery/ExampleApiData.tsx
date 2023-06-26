import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function TanStackApp() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <p>
          Below is example of fetching data from API with TanStack npm package.
        </p>
        <Example />
      </QueryClientProvider>
    </div>
  )
}

function Example() {
  const { isLoading, error, data } = useQuery<any>({
    queryKey: ['repoData'],
    queryFn: async () => {
      const data = await fetch('http://localhost:5000/example')
      //   const data = await fetch('https://api.github.com/repos/mturczyn/')
      return await data.json()
    },
  })

  if (isLoading) return <h3>Loading...</h3>

  if (error) return <h3>An error has occurred: {(error as any).message}</h3>

  return (
    <div>
      User data
      <h1>{data.name}</h1>
      <p>{data.description}</p>
      <strong>👀 {data.subscribers_count}</strong>{' '}
      <strong>✨ {data.stargazers_count}</strong>{' '}
      <strong>🍴 {data.forks_count}</strong>
    </div>
  )
}
