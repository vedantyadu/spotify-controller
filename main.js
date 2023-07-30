
const { BrowserWindow, app, ipcMain } = require('electron');
const { GlobalKeyboardListener } = require('node-global-key-listener')
const path = require('path');
const { argv } = require('process');

let win
let newKeybindListener
const pressedKeys = new Set()

function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    icon: __dirname + './public/icon.ico',
    webPreferences: {
      nodeIntegration: true,
      worldSafeExecuteJavaScript: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // For production - win.loadFile('./dist/index.html')
  win.loadURL('http://localhost:5173/')
}

if (process.defaultApp) {
  if (process.argv.length >= 2) {
    app.setAsDefaultProtocolClient('spotify-controller', process.execPath, [path.resolve(process.argv[1])])
  }
} else {
  app.setAsDefaultProtocolClient('spotify-controller')
}

const lock = app.requestSingleInstanceLock()

if (!lock) {
  app.quit()
}
else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    if (win) {
      if (win.isMinimized()) win.restore()
      win.focus()
      const uri = commandLine.pop()
      win.webContents.send('code', uri)
    }
  })
}

ipcMain.on('registerKeybind', (event, message) => {
  try {
    newKeybindListener = new GlobalKeyboardListener()
    newKeybindListener.addListener((e, down) => {
      if (e.state == 'DOWN') {
        pressedKeys.add(e.name)
      }
      else if (e.state == 'UP') {
        win?.webContents.send('newKeybind', {name: message.name, keys: Array.from(pressedKeys)})
        pressedKeys.clear()
      }
    })
  }
  catch (err) {
    console.log(err)
  }
})

ipcMain.on('killNewKeybindListener', () => {
  pressedKeys.clear()
  newKeybindListener?.kill()
})

app.on('ready', () => {
  createWindow()
  const keyStrokeListener = new GlobalKeyboardListener()
  keyStrokeListener.addListener((e, down) => {
    win?.webContents.send('keystate', {key: e.name, state: e.state, code: e.vKey})
  })
})
