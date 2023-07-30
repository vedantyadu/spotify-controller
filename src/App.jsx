import { Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import PrivateRoute from './utils/PrivateRoute'
import { useEffect, useState } from 'react'
import AppContext from './context/AppContext'
import Home from './components/Home'
import axios from 'axios'

function App() {

  const [userData, setUserData] = useState()
  const [keybinds, setKeybinds] = useState(JSON.parse(localStorage.getItem('keybinds')) || {})

  return (
    <AppContext.Provider value={{keybinds, setKeybinds, userData, setUserData}}>
      <Routes>
        <Route path='/' element={<PrivateRoute element={<Home/>}/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </AppContext.Provider>
  )
}

export default App
