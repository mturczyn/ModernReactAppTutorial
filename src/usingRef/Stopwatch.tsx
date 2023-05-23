import { useState, useRef } from 'react'

export default function Stopwatch() {
  const [startTime, setStartTime] = useState<any>(null)
  const [now, setNow] = useState<any>(null)
  const timerId = useRef<any>(null)

  function handleStart() {
    setStartTime(Date.now())
    setNow(Date.now())
    timerId.current = setInterval(() => setNow(Date.now()), 10)
  }

  function handleStop() {
    setStartTime(null)
    setNow(null)
    if (timerId.current) clearInterval(timerId.current)
  }

  let passed = 0
  if (startTime !== null && now !== null) {
    console.log('Clearing time interval with ID', timerId.current)
    passed = (now - startTime) / 1000
  }

  return (
    <div>
      <p>Time passed {passed}</p>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
    </div>
  )
}
