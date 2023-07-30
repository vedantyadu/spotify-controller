import { useState } from "react"

function Sliders() {

  const [seek, setSeek] = useState(localStorage.getItem('seek_duration') || 5)
  const [volume, setVolume] = useState(localStorage.getItem('volume_increment') || 5)

  const handleSeek = (e) => {
    localStorage.setItem('seek_duration', e.target.value)
    setSeek(e.target.value)
  }

  const handleVolume = (e) => {
    localStorage.setItem('volume_increment', e.target.value)
    setVolume(e.target.value)
  }

  return (
    <div className='flex flex-col justify-center mb-4 bg-neutral-900 p-4 rounded-md text-sm'>
      <div className='flex items-center mb-4'>
        <span className='mr-2 overflow-ellipsis overflow-hidden whitespace-nowrap'>Seek duration</span>
        <span className='ml-auto mr-2 text-neutral-400'>{seek} s</span>
        <input value={seek} onChange={handleSeek} className='w-64' type='range' min={1} max={15} step={1}></input>
      </div>
      <div className='flex items-center'>
        <span className='mr-2 overflow-ellipsis overflow-hidden whitespace-nowrap'>Volume increment</span>
        <span className='ml-auto mr-2 text-neutral-400'>{volume} %</span>
        <input value={volume} onChange={handleVolume} className='w-64' type='range' min={1} max={25} step={1}></input>
      </div>
    </div>
  )
}

export default Sliders
