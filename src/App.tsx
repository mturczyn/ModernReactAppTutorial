import React from 'react'
import logo from './logo.svg'
import './App.css'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import GettingStarted from './gettingStarted/GettingStartedTestArea'
import HooksExample from './learningHooks/HooksExamples'
import { ViewProps } from './NavigationBar/NavigationBar'
import NavigationBar from './NavigationBar/NavigationBar'

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
]

function App() {
  return (
    <div>
      <BrowserRouter>
        <NavigationBar pages={views}>
          <Routes>
            {views.map(x => (
              <Route
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
