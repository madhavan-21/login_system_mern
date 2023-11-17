import React from 'react'
import { Route, Routes, BrowserRouter, } from 'react-router-dom'
import Login from './compounds/Authentication/Login'
import Register from './compounds/Authentication/Register'
import Home from './compounds/Home/Home'


const App = () => {
  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>

          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>


    </div>
  )
}

export default App
