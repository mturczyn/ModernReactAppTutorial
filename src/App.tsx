import React from 'react'
import logo from './logo.svg'
import './App.css'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import GettingStarted from './gettingStarted/GettingStartedTestArea'
import HooksExample from './learningHooks/HooksExamples'
import { ViewProps } from './NavigationBar/NavigationBar'
import NavigationBar from './NavigationBar/NavigationBar'
import NumberList from './pureComponents/impureComponentExample'
import { StateExamples } from './state/stateExamples'
import ReducersExamples from './reducers/ReducersExamples'
import PassingPropsWithContext from './passingPropsWithContext/propsThroughContext'
import RefExamples from './usingRef/RefExamples'
import { EffectsExamples } from './effects/EffectsExamples'

interface ViewRouteProps extends ViewProps {
  element: JSX.Element
}

const views: ViewRouteProps[] = [
  {
    path: '*',
    element: <GettingStarted />,
    label: 'GettingStarted',
  },
  {
    path: 'HooksExample',
    element: <HooksExample />,
    label: 'HooksExample',
  },
  {
    path: 'NumberList',
    element: <NumberList />,
    label: 'NumberList',
  },
  {
    path: 'StateExamples',
    element: <StateExamples />,
    label: 'StateExamples',
  },
  {
    path: 'reducersExample',
    element: <ReducersExamples />,
    label: 'Reducers examples and notes',
  },
  {
    path: 'passingPropsWithContext',
    element: <PassingPropsWithContext />,
    label: 'Using context',
  },
  {
    path: 'refExamples',
    element: <RefExamples />,
    label: 'useRef examples',
  },
  {
    path: 'effectExamples',
    element: <EffectsExamples />,
    label: 'useEffect examples',
  },
]

function App() {
  return (
    <div>
      <BrowserRouter>
        <NavigationBar pages={views}>
          <Routes>
            {views.map(x => (
              <Route
                key={x.path}
                path={x.path}
                element={x.element}
              />
            ))}
          </Routes>
        </NavigationBar>
      </BrowserRouter>
    </div>
  )
}

export default App
