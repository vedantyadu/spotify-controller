// @ts-nocheck

import { BsSpotify } from 'react-icons/bs'
import { generateCodeChallenge, generateRandomString } from '../utils/oAuth'
import { useEffect } from 'react'
import axios from 'axios'
import qs from 'qs'
import { useNavigate } from 'react-router-dom'
import cfg from '../utils/config'


function Login() {

  const navigate = useNavigate()

  useEffect(() => {
    electron.auth.onCode((event, value) => {
      console.log(value)
      const urlParams = new URLSearchParams(value.replace('spotify-controller://getcode/?', ''))
      let code = urlParams.get('code')

      const code_verifier = localStorage.getItem('code_verifier')
      const data = {
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: cfg.redirectUri,
        client_id: cfg.clientid,
        code_verifier: code_verifier,
      }

      const setLocalStorage = async () => {
        try {
          const response = await axios.post('https://accounts.spotify.com/api/token', qs.stringify(data), {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })
          localStorage.setItem('access_token', response.data.access_token)
          localStorage.setItem('refresh_token', response.data.refresh_token)
          navigate('/')
        }
        catch (err) {
          console.log(err)
        }
      }
      setLocalStorage()
    })
  }, [])
  
  const handleClick = async () => {
    let codeVerifier = generateRandomString(128)
    const codeChallenge = await generateCodeChallenge(codeVerifier)
    let state = generateRandomString(16)
    let scope = 'user-read-private user-read-email user-read-currently-playing user-modify-playback-state user-read-playback-state user-library-modify'

    localStorage.setItem('code_verifier', codeVerifier)

    let args = new URLSearchParams({
      response_type: 'code',
      client_id: cfg.clientid,
      scope: scope,
      redirect_uri: cfg.redirectUri,
      state: state,
      code_challenge_method: 'S256',
      code_challenge: codeChallenge
    })

    electron.auth.openAuthURL('https://accounts.spotify.com/authorize?' + args)
  }

  return (
    <div className='w-full h-full p-2'>
      <div className='w-full h-full flex flex-col justify-center items-center bg-neutral-900 rounded-md'>
        <span className='mb-2 text-emerald-600 text-3xl font-bold'>Ctrl+Spotify</span>
        <span className='text-sm mb-20'>Keybinds for spotify desktop</span>
        <button className='flex justify-center items-center bg-emerald-700 rounded-md py-2 px-12' onClick={handleClick}>
          <BsSpotify/>
          <span className='ml-2'>Login</span>
        </button>
        <span className='text-neutral-600 text-xs mt-2'>Connect your spotify account</span>
      </div>
    </div>
    
  )
}

export default Login
