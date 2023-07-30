// @ts-nocheck

import { IoMdExit } from 'react-icons/io'
import { useContext, useEffect, useState, useRef } from "react"
import { useNavigate } from 'react-router-dom'
import playerFunctions from '../utils/playerFunction'
import KeybindCard from './KeybindCard'
import AppContext from '../context/AppContext'
import handleBind from '../utils/handleKeybind'
import Sliders from './Sliders'
import axios from 'axios'

function Home() {

  const {keybinds, userData, setUserData} = useContext(AppContext)
  const pressedKeys = useRef(new Set())
  const navigate = useNavigate()

  useEffect(() => {
    electron.key.keystate((event, message) => {
      if (message.state == 'DOWN') {
        pressedKeys.current.add(message.key)
      }
      else if (message.state == 'UP') {
        const keyArray = Array.from(pressedKeys.current)
        for (const k in keybinds) {
          if (keybinds[k] == keyArray.toString()) {
            handleBind(playerFunctions[k])
          }
        }
        pressedKeys.current.delete(message.key)
      }
    })
    return (() => {
      electron.key.removeKeystate()
    })
  }, [keybinds])

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await axios.get('https://api.spotify.com/v1/me', {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
          }
        })
        setUserData(response.data)
      }
      catch (err) {
        console.log(err)
        navigate('/login')
      }
    }
    getProfile()
  }, [])

  const logout = () => {
    localStorage.removeItem('access_token')
    navigate('/login')
  }

  return (
    <div className='w-full h-full flex flex-col px-4'>
      <div className='flex items-center py-8'>
        <img src={userData?.images[1]?.url} className='w-8 h-8 rounded-full mr-4'/>
        <span className='text-sm'>{userData?.display_name}</span>
        <button className='flex justify-center items-center rounded-md ml-auto outline-none text-neutral-600 hover:text-neutral-400' onClick={logout}>
          <span className='mr-2 text-sm font-bold'>Logout</span>
          <IoMdExit/>
        </button>
      </div>
      <span className='mb-2 text-neutral-500'>Settings</span>
      <Sliders/>
      <span className='mb-2 text-neutral-500'>Keybinds</span>
      <div className='w-full flex flex-col flex-1 mb-4'>
        {Object.keys(playerFunctions).map((func) => <KeybindCard key={func} playerFunction={func}/>)}
      </div>
    </div>
  )
}

export default Home
