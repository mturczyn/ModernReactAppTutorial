import {
  CounterButtonUsingRef,
  CounterButtonUsingState,
} from './CounterButtons'
import Stopwatch from './Stopwatch'

export default function RefExamples() {
  return (
    <div style={{ margin: '1rem' }}>
      <h1>Using refs</h1>
      <p>
        Using refs is an escape hatch from React, which allow you to
        store/persist value between renders (and not force re-render as is the
        case when altering state). For example simple Stopwatch below uses
        setInterval function, and the ID of the interval is stored using ref.
      </p>
      <Stopwatch />
      <p>
        Below are counter buttons, one is updating counter value using state
        variable that lets React re-render component on each state change. The
        other one is using ref to store counter value and so, changes to its
        value does not re-render.
      </p>
      <CounterButtonUsingRef />
      <br />
      <CounterButtonUsingState />
    </div>
  )
}
