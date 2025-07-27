import React from 'react'
import { Routes, Route } from "react-router-dom"
import Navbar from './Components/Navbar'
import Home from './Components/Home'
import AddJob from './Components/AddJob'

const App = () => {
  return (
   <div>
   <Navbar/>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddJob />} />
      </Routes>
   </div>
  )
}

export default App

