import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import { useState } from 'react'

const queryClient = new QueryClient()

const localEndpoint = 'http://localhost:5000/examplewithdelay'
const githubEndpoint = 'https://api.github.com/repos/tannerlinsley/react-query'

export default function TanStackApp() {
  const [withLocalEndpoint, setWithLocalEndpoint] = useState(false)

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <p>
          Below is example of fetching data from API with TanStack npm package.
        </p>
        <p>
          To run locally some sample API, use csharprepl for that (.NET is
          required, dotnet CLI to install csharprepl if needed):
        </p>
        <pre
          style={{
            background: 'lightgrey',
            padding: '1rem',
            fontFamily: 'monospace',
          }}
        >
          <code>{`csharprepl --framework Microsoft.AspNetCore.App`}</code>
        </pre>
        <p>And paste code below</p>
        <pre
          style={{
            background: 'lightgrey',
            padding: '1rem',
            fontFamily: 'monospace',
          }}
        >
          <code>
            {`using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Builder;
using System.Text.Json;

var builder = WebApplication.CreateBuilder();
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(p => p.AllowAnyOrigin());
});

var app = builder.Build();

app.UseCors();

app.MapGet("example", () => 
{
    return JsonSerializer.Serialize(new { name = "Michal", description = "Michal is awesome", subscribers_count = 1000, stargazers_count = 999, forks_count = -3 });
});

app.MapGet("examplewithdelay", () => 
{
    // Add artificial delay to imitate BE processing if needed.
    Task.Delay(1000).GetAwaiter().GetResult();
    return JsonSerializer.Serialize(new { name = "Delayed Michal", description = "Result with artificial slowdown", subscribers_count = 1000, stargazers_count = 999, forks_count = -3 });
});

app.Run();`}
          </code>
        </pre>
        <label>
          Use local endpoint
          <input
            type='checkbox'
            checked={withLocalEndpoint}
            onChange={(e: any) => setWithLocalEndpoint(e.target.checked)}
          />
        </label>
        <table>
          <tr>
            <td>Local endpoint</td>
            <td>
              <b>{localEndpoint}</b>
            </td>
          </tr>
          <tr>
            <td>Github endpoint</td>
            <td>
              <b>{githubEndpoint}</b>
            </td>
          </tr>
        </table>
        <Example url={withLocalEndpoint ? localEndpoint : githubEndpoint} />
      </QueryClientProvider>
    </div>
  )
}

function Example({ url }: any) {
  const { isLoading, error, data } = useQuery<any>({
    queryKey: [url],
    queryFn: async () => {
      const data = await fetch(url)
      return await data.json()
    },
  })

  if (isLoading) return <h3>Loading...</h3>

  if (error) return <h3>An error has occurred: {(error as any).message}</h3>

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.description}</p>
      <strong>👀 {data.subscribers_count}</strong>{' '}
      <strong>✨ {data.stargazers_count}</strong>{' '}
      <strong>🍴 {data.forks_count}</strong>
    </div>
  )
}
