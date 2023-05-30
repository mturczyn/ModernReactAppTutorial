import { useEffect, forwardRef, useRef, useState } from 'react'

export function EffectsExamples() {
  return (
    <div style={{ margin: '1rem' }}>
      <h3>Different "empty dependencies" for effects</h3>
      Below are different behaviours of effects depending on defined
      dependencies:
      <pre>
        <code>
          {`useEffect(() => {
  // This runs after every render
});

useEffect(() => {
  // This runs only on mount (when the component appears)
  // !! In development mode reacts calls this twice to ensure unmounting and mounting again 
  // the component will work correctly.
}, []);

useEffect(() => {
  // This runs on mount *and also* if either a or b have changed since the last render
}, [a, b]);`}
        </code>
      </pre>
      <h3>Not an Effect: initializing the application</h3>
      Some logic should only run once when the appllication starts. You can put
      it outside your components:
      <pre>
        <code>
          {`if(typeof window !== 'undefined') {
    checkAuthToken()
    loadDataFromLocalStorage()
}
function App() { ... }`}
        </code>
      </pre>
      This guarantees that such logic only runs once after the browser loads the
      page.
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
      <PopupApplicationToggle />
    </div>
  )
}

function PopupApplicationToggle() {
  const [show, setShow] = useState(true)
  const ref = useRef(null)

  return (
    <>
      <button onClick={() => setShow(true)}>Show modal</button>
      <MyDialog
        ref={ref}
        onBtnClick={() => setShow(!show)}
      />
      {show && <DialogMounter dialogRef={ref} />}
    </>
  )
}

let x = 0
function DialogMounter({ dialogRef }: any) {
  useEffect(() => {
    const dialog = dialogRef.current! as HTMLDialogElement
    // Due to this being called twice we need correct cleanup function,
    // otherwise we would face error by trying to open already opened dialog.
    console.log('>>>', 'this will be executed twice in develoment mode')
    dialog.showModal()

    // If close only once, this further unmounting of this component won't work
    // and lead to an error that dialog is already opened.
    // Code left for informational purposes, it should be just () => dialog.close()
    return () => {
      if (x === 0) {
        dialog.close()
        //x++
      }
    }
  }, [])

  return (
    <p>
      This is just component to show modal, as it shows in its effect - mount.
      then it cleans it up after unmounting.
    </p>
  )
}

const MyDialog = forwardRef(({ onBtnClick }: any, ref: any) => {
  return (
    <dialog ref={ref}>
      <h1>THIS IS MODAL</h1>
      <p>
        By passing reference to dialog to sibling component, we show dialog in
        mount and unmount events of sibling component to visualize how it closes
        and opens the modal.
      </p>
      <p>
        Then we just hide the "mounting control" to trigger it unmount event and
        cause it to call cleanup function, which in turn closes the popup.
      </p>
      <button onClick={() => onBtnClick()}>Hide modal</button>
    </dialog>
  )
})

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
