import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import LandingPage from './components/LandingPage'
import Navbar from './components/Navbar'
import Settings from './components/Settings'


const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route index element={<LandingPage/>}></Route>
          <Route path='components/Dashboard.jsx' element={<Dashboard/>}></Route>
          <Route path='components/Settings.jsx' element={<Settings/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
