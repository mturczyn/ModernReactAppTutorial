import { VideoApplication } from './VideoApplication'
import { PopupApplicationToggle } from './PopupApplicationToggle'
import { TimerCounterExample } from './TimerCounter'
import { IsOnlineIndicator } from './IsOnlineIndicator'
import { ChatApp } from './eventsAndEffects'

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
      <TimerCounterExample />
      <IsOnlineIndicator />
    </div>
  )
}
