import { useEffect, useRef, useState } from 'react'

export function EffectsExamples() {
  return (
    <div style={{ margin: '1rem' }}>
      <p>
        Below are different behaviours of effects depending on defined
        dependencies:
        <pre>
          <code>
            {`useEffect(() => {
  // This runs after every render
});

useEffect(() => {
  // This runs only on mount (when the component appears)
}, []);

useEffect(() => {
  // This runs on mount *and also* if either a or b have changed since the last render
}, [a, b]);`}
          </code>
        </pre>
      </p>
      <p>
        useEffect is used to synchronize with something outside React, such as
        network calls or things related to DOM directly, such as playing video.
        In below example useEffect hook is used to avoid using reference to DOM
        node in render method.
      </p>
      <p>
        Here we synchronized React with external system, whcih is browser media
        API.
      </p>
      <VideoApplication />
    </div>
  )
}

function VideoApplication() {
  const [isPlaying, setIsPlaying] = useState(false)
  return (
    <>
      <button onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <br />
      <VideoPlayer
        isPlaying={isPlaying}
        src='https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4'
      />
    </>
  )
}

function VideoPlayer({ src, isPlaying }: any) {
  const ref = useRef(null)

  // This will run after every render of component.
  // It should not be called directly in render as this would make the function
  // impure and cause side effects, such as modifying DOM.
  // Moreover, during first render, ref would not be set yet.
  // That's why we want it to run after each render of the component.
  // BUT running effect after each render is not necessarily desired,
  // so we can specifu second argument with list of dependencies, whcih
  // change wil trigger the effect.
  useEffect(() => {
    if (isPlaying) {
      ;(ref.current! as HTMLVideoElement).play()
    } else {
      ;(ref.current! as HTMLVideoElement).pause()
    }
  }, [isPlaying])

  return (
    <video
      src={src}
      ref={ref}
      loop
      playsInline
    />
  )
}
