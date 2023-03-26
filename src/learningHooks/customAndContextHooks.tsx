import { useContext, createContext, useState } from 'react'
import { incrementInBounds, decrementInBounds } from '../utilities'

export const HeadingLevelContext = createContext(1)

// Custom hook
export function useHeadingLevel() {
  const level = useContext(HeadingLevelContext)

  return level ? level : 1
}

export function CustomizableHeader() {
  const [level, setLevel] = useState(1)
  const [headingCount, setHeadingCount] = useState(1)

  return (
    <HeadingLevelContext.Provider value={level}>
      <p>
        Below heading level is controlled by context value. For that also we use
        custom hook around useContext.
      </p>
      <div>
        <button onClick={() => setLevel(decrementInBounds(level, 1))}>
          Increase headings
        </button>
        <button onClick={() => setLevel(incrementInBounds(level, 6))}>
          Decrease headings
        </button>
      </div>
      <div>
        <button
          onClick={() => setHeadingCount(incrementInBounds(headingCount, 10))}
        >
          Increase number of headings
        </button>
        <button
          onClick={() => setHeadingCount(decrementInBounds(headingCount, 0))}
        >
          Decrease number of headings
        </button>
      </div>
      {Array(headingCount).fill(<Heading>Heading with level {level}</Heading>)}
    </HeadingLevelContext.Provider>
  )
}

function Heading(props: { children: any }) {
  const level = useHeadingLevel()
  switch (level) {
    case 1:
      return <h1>{props.children}</h1>
    case 2:
      return <h2>{props.children}</h2>
    case 3:
      return <h3>{props.children}</h3>
    case 4:
      return <h4>{props.children}</h4>
    case 5:
      return <h5>{props.children}</h5>
    case 6:
      return <h6>{props.children}</h6>
    default:
      return <h1>{props.children}</h1>
  }
}
