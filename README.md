# Spotify Controller
#### Spotify Controller is an app that allows you to control the Spotify desktop app via keybinds.   

Spotify Controller does this using the Spotify API. The app is created using ElectronJS and React.
   
#### 🔗 [Download the executable](https://drive.google.com/file/d/18NLHPsRCbG7X-nZkPR3I9NggSi639z0d/view?usp=drive_link)
## Getting started
### Installing dependencies
```bash
npm install
```
### Setting up Spotify API credentials
Create `config.js` in [`/src/utils`](https://github.com/vedantyadu/spotify-controller/tree/master/src/utils) with the following format :
```js
const cfg = {
  clientid: '<your-spotify-api-client-id>',
  redirectUri: '<your-redirect-webpage-url>'
}

export default cfg
```
### Creating a redirection page
Create a webpage that opens the **Spotify Controller** app upon redirection from the Spotify OAuth login screen using custom URL Protocol.   
##### 🔗 [Example](https://github.com/vedantyadu/spotify-controller-redirect)

### Starting the app in development mode
#### Start the Vite server
```bash
npm run dev
```
#### Start the electron app
```bash
npm start
```

## Building the app
### Building the Vite React app
```bash
npm run build
```
### Changing the link notations
Change all src or hrefs from `/` to `./` notation in `/dist/index.html`.   
Example - `/assets/icon.ico` to `./assets/icon.ico`.

### Changing the app URL in the Electron app
Replace `win.loadURL('http://localhost:5173/')` in the `createWindow` function in [`main.js`](https://github.com/vedantyadu/spotify-controller/blob/master/main.js) with `win.loadFile('./dist/index.html')`.

### Pack the Electron app
Building the app requires [`@electron/packager`](https://www.npmjs.com/package/@electron/packager)    
```bash
npx @electron/packager . --overwrite --icon=./public/icon.ico
```
