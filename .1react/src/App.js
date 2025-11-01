import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Menu from './pages/Menu'
import Game from './pages/Game'
import Sala from './pages/Sala'
import CrearSala from './pages/CrearSala'


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Menu />} />
      <Route path='/game' element={<Game/>} />
      <Route path='/menu' element={<Menu />} />
      <Route path='/sala' element={<Sala />} />
      <Route path='/crearSala' element={<CrearSala />} />
    </Routes>
  )
}