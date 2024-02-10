// window.addEventListener('DOMContentLoaded', () => {
//     const replaceText = (selector, text) => {
//       const element = document.getElementById(selector)
//       if (element) element.innerText = text
//     }
  
//     for (const dependency of ['chrome', 'node', 'electron']) {
//       replaceText(`${dependency}-version`, process.versions[dependency])
//       console.log(process)
//     }
//   })

  const { contextBridge, ipcRenderer } = require('electron')

  contextBridge.exposeInMainWorld('electronAPI', {
    setTitle: (title) => ipcRenderer.send('set-title', title),
    openPriceLadder: (instrumentName) => ipcRenderer.send('openPriceLadder', instrumentName)
  })