import { useState, lazy, Suspense } from 'react'
import { useFormInput } from '../../../effects/reusingLogicWithCustomHooks'

const LazyGreeting = lazy(() => import('./LazyGreeting'))
const LazyUserProfile = lazy(() => import('./LazyUserProfile'))
const LazyWelocmeMessage = lazy(() => import('./LazyWelocmeMessage'))

const LAZY_WELCOME = 'Lazy welcome'
const LAZY_GREETING = 'Lazy greeting'
const LAZY_USER_PROFILE = 'Lazy user profile'

export default function WecomingPanelWithLazyLoading() {
  const [selectedOption, setSelectedOption] = useState('')
  const nameProps = useFormInput('michal')
  const ageProps = useFormInput(30)

  return (
    <div>
      <p>
        Below is example of lazy laoded components wrapped in Suspense
        component. Each component with message is loaded lazily and can be
        observed in network in browser's dev tools.
      </p>
      <label>
        Name:
        <input {...nameProps} />
      </label>
      <label>
        Age:
        <input {...ageProps} />
      </label>
      <fieldset>
        <RadioInput
          label={LAZY_WELCOME}
          value={selectedOption}
          onChange={(x: any) => setSelectedOption(x)}
        />
        <RadioInput
          label={LAZY_USER_PROFILE}
          value={selectedOption}
          onChange={(x: any) => setSelectedOption(x)}
        />
        <RadioInput
          label={LAZY_GREETING}
          value={selectedOption}
          onChange={(x: any) => setSelectedOption(x)}
        />
      </fieldset>
      <Suspense fallback={<h4>Loading component</h4>}>
        {selectedOption === LAZY_GREETING && (
          <LazyGreeting name={nameProps.value} />
        )}
        {selectedOption === LAZY_USER_PROFILE && (
          <LazyUserProfile
            name={nameProps.value}
            age={ageProps.value}
          />
        )}
        {selectedOption === LAZY_WELCOME && (
          <LazyWelocmeMessage name={nameProps.value} />
        )}
      </Suspense>
    </div>
  )
}

function RadioInput({ label, value, onChange }: any) {
  const checked = label === value
  return (
    <label>
      {label}
      <input
        value={label}
        checked={checked}
        onChange={(e: any) => onChange(e.target.value)}
        type='radio'
        name='welcomeMessage'
      />
    </label>
  )
}
