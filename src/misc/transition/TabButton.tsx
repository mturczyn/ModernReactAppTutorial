import { useTransition } from 'react'

export default function TabButton({
  children,
  isActive,
  shouldUseTransition,
  onClick,
}: any) {
  const [isPending, startTransition] = useTransition()
  if (isActive) {
    return <b>{children}</b>
  }
  return (
    <button
      disabled={isPending}
      onClick={() => {
        if (shouldUseTransition) {
          startTransition(() => {
            onClick()
          })
        } else {
          onClick()
        }
      }}
    >
      {isPending ? 'Loading/rendering tab' : children}
    </button>
  )
}
