import {
  CounterButtonUsingRef,
  CounterButtonUsingState,
} from './CounterButtons'
import { FocuasbleInput } from './FocusableInput'
import { Gallery, GalleryRefactoredWithRefCallback } from './ListOfImages'
import Stopwatch from './Stopwatch'
import { MyForm, MyFormWithCorrectRef } from './FocusableCustomInput'
import ToggleMessage from './SimpleMessageToggle'

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
      <p>
        Using refs in React is also especially useful when we need to
        programatically interact with HTML DOM elements, for example for getting
        focus or scrolling into view.
      </p>
      <p>Below we have focusable input, click the button to focus the input.</p>
      <FocuasbleInput />
      <p>
        Below here's gallery and has buttons to scroll particular image into
        view.
      </p>
      <Gallery />
      <p>Below is refactored gallery to use ref callback</p>
      <GalleryRefactoredWithRefCallback />
      <p>
        Pssing refs to custom components is not supported by default, so if we
        use ref attribute on custom components, it won't work as shown below -
        input is not custom component:
      </p>
      <MyForm />
      <p>Below example shows correct passing ref to custom component:</p>
      <MyFormWithCorrectRef />
      <p>
        Below we have two ways of updating the view with React. State variable
        decided whether React should render or not the text (using conditional
        rendering), while the second buttom directly removes HTML element from
        the DOM, causing to desynchronize React tree snapshot (what it
        remembers) and actual DOM structure. Thus, ater clicking it, when first
        button is clicker, the app crashes.
      </p>
      <ToggleMessage message='HELLO world' />
    </div>
  )
}
