// @ts-nocheck

const { contextBridge, ipcRenderer, shell } = require('electron')

contextBridge.exposeInMainWorld('electron', {
  auth: {
    openAuthURL: (url) => shell.openExternal(url),
    onCode: (callback) => ipcRenderer.on('code', callback)
  },
  key: {
    keystate: (callback) => ipcRenderer.on('keystate', callback),
    removeKeystate: () => ipcRenderer.removeAllListeners('keystate'),
    registerKeybind: (message) => ipcRenderer.send('registerKeybind', message),
    newKeybind: (callback) => ipcRenderer.on('newKeybind', callback),
    killNewKeybindListener: () => {
      ipcRenderer.send('killNewKeybindListener')
      ipcRenderer.removeAllListeners('newKeybind')
    }
  }
})
