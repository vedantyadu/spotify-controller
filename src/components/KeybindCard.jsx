import { useContext } from 'react'
import AppContext from '../context/AppContext'
import playerFunctions from '../utils/playerFunction'
import { RiCloseLine } from 'react-icons/ri'

function KeybindCard({playerFunction}) {

  const {keybinds, setKeybinds} = useContext(AppContext)

  const handleFocus = (e) => {
    electron.key.registerKeybind({name: playerFunction})
    electron.key.newKeybind((event, message) => {
      const temp = Object.assign({}, keybinds)
      for (const k in temp) {
        if (keybinds[k] == message.keys.toString()) {
          delete temp[k]
        }
      }
      temp[message.name] = message.keys
      localStorage.setItem('keybinds', JSON.stringify(temp))
      setKeybinds(temp)
      e.target.blur()
    })
  }

  const handleBlur = () => {
    electron.key.killNewKeybindListener()
  }

  const reset = () => {
    const temp = Object.assign({}, keybinds)
    delete temp[playerFunction]
    localStorage.setItem('keybinds', JSON.stringify(temp))
    setKeybinds(temp)
  }

  return (
    <div className='flex items-center mb-2 bg-neutral-900 px-4 py-2 rounded-md'>
      <span className='text-sm overflow-ellipsis overflow-hidden whitespace-nowrap mr-2'>{playerFunctions[playerFunction]}</span>
      <button className='text-neutral-600 text-xl hover:text-neutral-300 ml-auto mr-2' onClick={reset}>
        <RiCloseLine/>
      </button>
      <div className='w-64 h-12 flex items-center overflow-x-auto px-2 border-2 text-neutral-400 border-neutral-700 rounded-md cursor-pointer outline-none focus:border-emerald-600 scroll-lite' onFocus={handleFocus} onBlur={handleBlur} tabIndex={0}>
          {
            keybinds[playerFunction]?.map((key, i) => {
              if (i == 0) {
                return (
                  <span key={key} className='text-xs border-2 border-neutral-600 bg-transparent rounded-md px-1 whitespace-nowrap'>{key}</span>
                )
              }
              return (
                <>
                  <span key={i} className='text-neutral-500 font-bold mx-1'>+</span>
                  <span key={key} className='text-xs border-2 border-neutral-600 bg-transparent rounded-md px-1 whitespace-nowrap'>{key}</span>
                </>
              )
            })
          }
      </div>
    </div>
  )
}

export default KeybindCard
