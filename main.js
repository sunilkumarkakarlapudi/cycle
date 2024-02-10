const { app, BrowserWindow, ipcMain } = require('electron')
const path = require("path");
const url = require("url")


/************************************************************************************************************************************************************************
 * This block is all about getting all the required tokens from KiteConnect, and establishing a session with KiteConnect
 * We will have to figure out how to deal with the session expiry. Ideally we should keep monitoring for session expiry and trigger a new session 
 * Anyways, in this block once the session is establised, we should get the meta data like what is the current `Holdings`, `Positions`, `Available Margin`, and other such information.
 */
// We are tying to connect to Kite first and get the static details like portfolio, balance and other such stuff
var KiteConnect = require("kiteconnect").KiteConnect;
const kiteCodes = require('./apiKeys');
var kc = new KiteConnect({
  api_key: kiteCodes.api_key,
});

kc.generateSession(kiteCodes.request_token, kiteCodes.api_secret)
  .then(function (response) {
    // console.log(response)
    init();
  })
  .catch(function (err) {
    debugger
    console.log(err);
  });

function init() {
  // Fetch equity margins.
  // You can have other api calls here.
  kc.getMargins()
    .then(function (response) {
      console.log(response)
      debugger
      // You got user's margin details.
    })
    .catch(function (err) {
      // Something went wrong.
    });
}
/**
 * End of block.
 * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
 */





/************************************************************************************************************************************************************************
 * In this block, we open the main window, and then implement all the code required for opening new windows, and managing them and the overall state.
 * Will have to build good resource monitoring mechanism here.
 */

let windows = new Set()

// Function to create the main window
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences:{
      preload: path.join(__dirname,'preload.js')
    }
  })
  win.webContents.openDevTools()
  win.loadFile('index.html')
  windows.add(win)
}

// Function to create a new window
const openPriceLadder = () => {
  const window = new BrowserWindow({
    width: 900,
    height: 600
  });
  window.loadFile('priceladder.html')
  windows.add(window);
}


// App init
app.whenReady().then(() => {
  createWindow()
})

ipcMain.on('openPriceLadder', function(event, args){
  // required information is Instrument name, required depth
  // Will have to check if there is already a price ladder for this Instrument, and then open a new priceladder.
  openPriceLadder(args.instrumentName?args.instrumentName:'instrumentNotFound')
  console.log(args)
})

ipcMain.on('update-value', function (event, arg) {
  console.log(arg);
   
  // Passing the data from Main Process to index.html
  // BrowserWindow Instance, value will be received in 
  // the index.js based on the Key set here. Using the 
  // 'win.webContents.send' method for Asynchronous Data Transfer
  win.webContents.send('updateValue', arg);
});
/***
 * End of block
 * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
 */