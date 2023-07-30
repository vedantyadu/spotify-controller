import axios from "axios"
import playerFunctions from "./playerFunction"

async function handleBind(task) {
  try {
    if (task == playerFunctions['PLAY/PAUSE']) {
      const playback = await getPlayerState()
      if (playback.is_playing) pauseTrack()
      else playTrack()
    }
    else if (task == playerFunctions['NEXT']) {
      nextTrack()
    }
    else if (task == playerFunctions['PREVIOUS']) {
      previousTrack()
    }
    else if (task == playerFunctions['FORWARD']) {
      const playback = await getPlayerState()
      seek(playback.progress_ms + (Number(localStorage.getItem('seek_duration')) * 1000))
    }
    else if (task == playerFunctions['BACKWARD']) {
      const playback = await getPlayerState()
      seek(playback.progress_ms - (Number(localStorage.getItem('seek_duration')) * 1000))
    }
    else if (task == playerFunctions['VOLUMEUP']) {
      const playback = await getPlayerState()
      volumeChange(playback.device.volume_percent + Number(localStorage.getItem('volume_increment')))
    }
    else if (task == playerFunctions['VOLUMEDOWN']) {
      const playback = await getPlayerState()
      volumeChange(playback.device.volume_percent - Number(localStorage.getItem('volume_increment')))
    }
    else if (task == playerFunctions['SHUFFLE']) {
      const playback = await getPlayerState()
      shuffle(playback.shuffle_state? false: true)
    }
    else if (task == playerFunctions['LIKE']) {
      likeTrack()
    }
  }
  catch (err) {
    console.log(err)
  }
}

async function getPlayerState() {
  const response = await axios.get('https://api.spotify.com/v1/me/player', {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('access_token')
    }
  })
  return response.data
}

async function playTrack() {
  await axios.put('https://api.spotify.com/v1/me/player/play', {}, {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('access_token')
    }
  })
}

async function pauseTrack() {
  await axios.put('https://api.spotify.com/v1/me/player/pause', {}, {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('access_token')
    }
  })
}

async function nextTrack() {
  await axios.post('https://api.spotify.com/v1/me/player/next', {}, {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('access_token')
    }
  })
}

async function previousTrack() {
  await axios.post('https://api.spotify.com/v1/me/player/previous', {}, {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('access_token')
    }
  })
}

async function seek(time) {
  await axios.put('https://api.spotify.com/v1/me/player/seek?position_ms=' + time, {}, {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('access_token')
    }
  })
}

async function volumeChange(volume) {
  await axios.put('https://api.spotify.com/v1/me/player/volume?volume_percent=' + volume, {}, {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('access_token')
    }
  })
}

async function shuffle(state) {
  await axios.put('https://api.spotify.com/v1/me/player/shuffle?state=' + state, {}, {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('access_token')
    }
  })
}

async function likeTrack() {
  const respose = await axios.get('https://api.spotify.com/v1/me/player', {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('access_token')
    }
  })
  await axios.put('https://api.spotify.com/v1/me/tracks?ids=' + respose.data.item.id, {}, {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('access_token')
    }
  })
}

export default handleBind
