// main.js

// Modules to control application life and create native browser window
const { ipcMain, app, BrowserWindow } = require('electron')
const path = require('path')
// import ipc main from electron

let welcomeWindow, dashboardWindow;
function createWelcomeWindow () {
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

  // and load the welcome_screen.html of the app.
  welcomeWindow.loadFile('windows_html/welcome_screen.html')
  welcomeWindow.maximize()
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
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

  // and load the welcome_screen.html of the app.
  dashboardWindow.loadFile('windows_html/dashboardScreen.html')
  dashboardWindow.maximize()
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWelcomeWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWelcomeWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// receive message from ipc renderer to main
ipcMain.on('welcome:close', (event, arg) => {
  welcomeWindow.close()
})

ipcMain.on('welcome:minimize', (event, arg) => {
  welcomeWindow.minimize()
})

ipcMain.on('welcome:maximize', (event, arg) => {
  if(welcomeWindow.isMaximized()) {
    welcomeWindow.unmaximize()
  } else {
  welcomeWindow.maximize()
  }
})
ipcMain.on('go_to_dashboard', (event,arg) => {
  createdashboardWindow()
  welcomeWindow.close()
})
ipcMain.on('dashboard:close',()=> {
  dashboardWindow.close()
})
ipcMain.on('dashboard:minimize',()=> {
  dashboardWindow.minimize()
})
ipcMain.on('dashboard:maximize',()=> {
  if(dashboardWindow.isMaximized()) {
    dashboardWindow.unmaximize()
  } else {
  dashboardWindow.maximize()
  }
})