import { memo, useCallback, useEffect, useState } from 'react'

export default function SimpleGreetingForm() {
  const [name, setName] = useState('Michal')
  const [address, setAddress] = useState('Galaxy far away')
  const [maxRenders, setMaxRenders] = useState(1000)
  const [memoRenderCnt, setMemoRenderCnt] = useState(0)
  const [noMemoRenderCnt, setNoMemoRenderCnt] = useState(0)

  const renderCountIncreased = useCallback(
    () => setNoMemoRenderCnt(x => x + 1),
    [setNoMemoRenderCnt]
  )

  const renderMemoCountIncreased = useCallback(
    () => setMemoRenderCnt(x => x + 1),
    [setMemoRenderCnt]
  )

  return (
    <div>
      <p>
        The second greeting is memoized component, which does not re-render when
        parent is re-rendering, it only re-renders when it's props or state
        changes. So for example, the whole component is rerendered, when we
        change the address, and so it unnecessarily rerenders not memoized
        greeting.
      </p>
      <p>
        What's more intersting, keeping in state number of renders of each
        component will trigger not-memoized version to re-render again and
        again, and so we need to set limit to hide it.
      </p>
      <h3>NoMemo render count: {noMemoRenderCnt}</h3>
      <h3>Memo render count: {memoRenderCnt}</h3>
      <label>
        Name:{' '}
        <input
          value={name}
          onChange={(e: any) => setName(e.target.value)}
        ></input>
      </label>
      <br />
      <label>
        Address:{' '}
        <input
          value={address}
          onChange={(e: any) => setAddress(e.target.value)}
        ></input>
      </label>
      <br />
      <label>
        Max renders:{' '}
        <input
          value={maxRenders}
          onChange={(e: any) => setMaxRenders(e.target.value)}
        ></input>
      </label>
      {noMemoRenderCnt > maxRenders ? (
        <b>
          <p>Hidden due to high amount of rerenders</p>
        </b>
      ) : (
        <Greeting
          name={name}
          renderCountChanged={renderCountIncreased}
        />
      )}
      <MemoGreeting
        name={name}
        renderCountChanged={renderMemoCountIncreased}
      />
    </div>
  )
}

function Greeting({ name, renderCountChanged }: any) {
  useEffect(() => renderCountChanged())
  return <p>Hello {name}</p>
}

/*
memo also accepts second param allowing to specify comparison function for the
prop, roughly it is
function arePropsEqual(oldProps, newProps); 
*/
const MemoGreeting = memo(function MemoGreeting({
  name,
  renderCountChanged,
}: any) {
  useEffect(() => renderCountChanged())
  return <p>Hello {name}</p>
})
