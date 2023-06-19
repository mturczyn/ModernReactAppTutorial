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
      onClick={() => {
        if (shouldUseTransition) {
          startTransition(() => {
            onClick()
          })
        } else {
          console.log('>>', 'not using transition')
          onClick()
        }
      }}
    >
      {children}
    </button>
  )
}
