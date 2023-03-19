import React from 'react'
import logo from './logo.svg'
import './App.css'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import GettingStarted from './gettingStarted/GettingStartedTestArea'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='*'
          element={<GettingStarted />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
