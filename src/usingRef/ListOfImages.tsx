import { useRef } from 'react'

export function Gallery() {
  const dadImgRef = useRef(null)
  const momImgRef = useRef(null)
  const bingoImgRef = useRef(null)
  const blueyImgRef = useRef(null)

  const scrollIntoView = (el: { current: any }) =>
    (el.current! as HTMLElement).scrollIntoView({ behavior: 'smooth' })

  return (
    <>
      <button onClick={() => scrollIntoView(dadImgRef)}>
        Dad image into view
      </button>
      <button onClick={() => scrollIntoView(momImgRef)}>
        Mom image into view
      </button>
      <button onClick={() => scrollIntoView(bingoImgRef)}>
        Bingo image into view
      </button>
      <button onClick={() => scrollIntoView(blueyImgRef)}>
        Bluey image into view
      </button>
      <div
        style={{
          height: '30rem',
          border: '0.1rem solid black',
          overflowY: 'hidden',
        }}
      >
        <img
          alt=''
          ref={bingoImgRef}
          style={{ height: '20rem', display: 'block' }}
          src='bluey/Bingo.png'
        />
        <img
          alt=''
          ref={blueyImgRef}
          style={{ height: '23rem', display: 'block' }}
          src='bluey/bluey.png'
        />
        <img
          alt=''
          ref={dadImgRef}
          style={{ height: '40rem', display: 'block' }}
          src='bluey/bandit.png'
        />
        <img
          alt=''
          ref={momImgRef}
          style={{ height: '40rem', display: 'block' }}
          src='bluey/Chilli_Heeler.webp'
        />
      </div>
    </>
  )
}

const images = [
  'bluey/Chilli_Heeler.webp',
  'bluey/bandit.png',
  'bluey/bluey.png',
  'bluey/Bingo.png',
]

// Above component uses multiple refs, which maybe inconvenient. We could
// use ref to the common parent and use query selectors to access all elements
// that we want, but we also could use ref callback, as below:
export function GalleryRefactoredWithRefCallback() {
  const itemsRef = useRef<any>(null)

  function getMap() {
    return itemsRef.current ?? (itemsRef.current = new Map())
  }

  function scrollIntoView(image: any) {
    return getMap().get(image).scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {images.map(i => (
        <button onClick={() => scrollIntoView(i)}>{i} into view</button>
      ))}
      <div
        style={{
          height: '30rem',
          border: '0.1rem solid black',
          overflowY: 'hidden',
        }}
      >
        {images.map((i: any) => (
          <img
            alt={i}
            ref={(node: any) => getMap().set(i, node)}
            style={{ height: '40rem', display: 'block' }}
            src={i}
          />
        ))}
      </div>
    </>
  )
}
