import React from 'react'
import { Route, Routes, BrowserRouter, } from 'react-router-dom'
import Login from './compounds/Authentication/Login'
import Register from './compounds/Authentication/Register'


const App = () => {
  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </BrowserRouter>


    </div>
  )
}

export default App
