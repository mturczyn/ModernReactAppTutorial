import { useEffect, useRef, useState } from 'react'

export function TimerCounterExample() {
  return (
    <>
      <p>
        Below counters should increase by 1 every second, but first timer does
        not cleanup its timer and in development mode when React mounts
        component twice, it sets two timers, thus two timers increase state by
        1. The other one correctly defines cleanup in effect.
      </p>
      <TimerCounter withTimerCleanup={true} />
      <TimerCounter withTimerCleanup={false} />
      <p>
        Below timer has no dependency array and no clean up function in effect
        which increments counter. Thus it increments on every render.
      </p>
    </>
  )
}

function TimerCounter({ withTimerCleanup }: any) {
  const [count, setCount] = useState(0)
  const timerRef = useRef<any>(null)

  useEffect(() => {
    function onTick() {
      setCount(c => c + 1)
    }

    timerRef.current = setInterval(onTick, 1000)

    return () => withTimerCleanup && clearInterval(timerRef.current!)
  }, [withTimerCleanup])

  return <h1>{count}</h1>
}
