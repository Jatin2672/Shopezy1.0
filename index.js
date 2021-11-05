// main.js

const { ipcMain, app, BrowserWindow } = require('electron')
const path = require('path')

let welcomeWindow, dashboardWindow

function createWelcomeWindow() {
  // Create the browser window.
  welcomeWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      preload: path.join(__dirname, 'script/welcome_screen.js')
    }
  })
  welcomeWindow.loadFile('windows_html/welcome_screen.html')
  welcomeWindow.maximize()
}
function createdashboardWindow() {
  dashboardWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      preload: path.join(__dirname, 'script/dashboardScreen.js')
    }
  })

  dashboardWindow.loadFile('windows_html/dashboardScreen.html')
  dashboardWindow.maximize()

}
app.whenReady().then(() => {
  createWelcomeWindow()
  createServer()
})

ipcMain.on('welcome:close', (event, arg) => {
  welcomeWindow.close()
})
ipcMain.on('welcome:minimize', (event, arg) => {
  welcomeWindow.minimize()
})
ipcMain.on('welcome:maximize', (event, arg) => {
  if (welcomeWindow.isMaximized()) {
    welcomeWindow.unmaximize()
  } else {
    welcomeWindow.maximize()
  }
})

ipcMain.on('dashboard:close', () => {
  dashboardWindow.close()
})
ipcMain.on('dashboard:minimize', () => {
  dashboardWindow.minimize()
})
ipcMain.on('dashboard:maximize', () => {
  if (dashboardWindow.isMaximized()) {
    dashboardWindow.unmaximize()
  } else {
    dashboardWindow.maximize()
  }
})
ipcMain.on('go_to_dashboard', (event, arg) => {
  createdashboardWindow()
  welcomeWindow.close()
})

// -------------------------------RESTRICTED AREA---------------------------------------------//
const http = require('http')
const host = 'localhost'
const port = 8000

function createServer() {

  const requestListener = function (req, res) {
    switch (req.url) {
      case "/connect":
        res.writeHead(200)
        res.end("connected Successfully")
        break

      default:
        res.writeHead(404)
        res.end("Not Found!")
        break
    }
  }

  const server = http.createServer(requestListener)
  server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`)
  })

}