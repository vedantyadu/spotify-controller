# Spotify-Controller
Spotify Controller is a desktop application that allows you to control the Spotify desktop application.   
It is built using React and electonjs and uses the Spotify API.   
Download spotify controller executable here 👉 [[Download link](https://drive.google.com/file/d/1W9ABOhX0eBMwMUW5_8SG0nW7KK9YVxhK/view?usp=drive_link)]
## Developer setup
- Run `npm install`.
- Create `config.js` in [`/src/utils`](https://github.com/vedantyadu/spotify-controller/tree/master/src/utils) [[Example](#configjs-example)].
- Create a webpage that redirects to the custom protocol URI [[Example](https://github.com/vedantyadu/spotify-controller-redirect)].
- Run `npm run dev` on one terminal and `npm start` on another terminal.

### `config.js` example
```js  
const cfg = {
  clientid: '<your-spotify-api-client-id>',
  redirectUri: '<your-redirect-webpage-url>'
}

export default cfg
```
## Building the app
Building the app requires [`electron-packager`](https://www.npmjs.com/package/electron-packager)   
- Build the Vite React app using `npm run build`.
- Change all src or hrefs from `/` to `./` notation in `/dist/index.html` (Eg. `/assets/icon.ico` to `./assets/icon.ico`).
- Package the electron app using `npx electron-packager . --overwrite --icon=./public/icon.ico`.
