import { useEffect, forwardRef, useState, useRef } from 'react'

export function PopupApplicationToggle() {
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
