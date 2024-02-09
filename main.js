const { app, BrowserWindow, ipcMain } = require('electron')
const path = require("path");

// The list of open windows
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
  win.loadFile('index.html')
  windows.add(win)
}

// Function to create a new window
const createNewWindow = () => {
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

ipcMain.on('update-value', function (event, arg) {
  console.log(arg);
   
  // Passing the data from Main Process to index.html
  // BrowserWindow Instance, value will be received in 
  // the index.js based on the Key set here. Using the 
  // 'win.webContents.send' method for Asynchronous Data Transfer
  win.webContents.send('updateValue', arg);
});
