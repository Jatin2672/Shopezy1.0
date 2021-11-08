// main.js

const { ipcMain, app, BrowserWindow } = require("electron");
const path = require("path");

let welcomeWindow, dashboardWindow;

function createWelcomeWindow() {
  // Create the browser window.
  welcomeWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      preload: path.join(__dirname, "script/welcome_screen.js"),
    },
  });
  welcomeWindow.loadFile("windows_html/welcome_screen.html");
  welcomeWindow.maximize();
}
function createdashboardWindow() {
  dashboardWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      preload: path.join(__dirname, "script/dashboardScreen.js"),
    },
  });

  dashboardWindow.loadFile("windows_html/dashboardScreen.html");
  dashboardWindow.maximize();
}
app.whenReady().then(() => {
  createWelcomeWindow();
  createServer();
});

ipcMain.on("welcome:close", (event, arg) => {
  welcomeWindow.close();
});
ipcMain.on("welcome:minimize", (event, arg) => {
  welcomeWindow.minimize();
});
ipcMain.on("welcome:maximize", (event, arg) => {
  if (welcomeWindow.isMaximized()) {
    welcomeWindow.unmaximize();
  } else {
    welcomeWindow.maximize();
  }
});

ipcMain.on("dashboard:close", () => {
  dashboardWindow.close();
});
ipcMain.on("dashboard:minimize", () => {
  dashboardWindow.minimize();
});
ipcMain.on("dashboard:maximize", () => {
  if (dashboardWindow.isMaximized()) {
    dashboardWindow.unmaximize();
  } else {
    dashboardWindow.maximize();
  }
});
ipcMain.on("go_to_dashboard", (event, arg) => {
  createdashboardWindow();
  welcomeWindow.close();
});

// -------------------------------RESTRICTED AREA---------------------------------------------//
const http = require("http");
const host = "localhost";
const port = 8000;

// import sqllite3
const sqlite3 = require('sqlite3').verbose()

    // open a database in sql lite 3
    let db = new sqlite3.Database('database/sellerinfo1.db' , (err) => {
        if(err){ console.log(err.message) }
        console.log("connected to database")
    });
    db.run(`CREATE TABLE IF NOT EXISTS sellerinfo (barcode TEXT, name TEXT, price TEXT, quantity TEXT, image TEXT)`);
    db.close()


// import ip from os module
const { networkInterfaces } = require("os");

function logIP() {
  const getLocalExternalIP = () =>
    []
      .concat(...Object.values(networkInterfaces()))
      .find((details) => details.family === "IPv4" && !details.internal)
      .address;
  console.log(getLocalExternalIP() + ":8000/connected");
}

function createServer() {
  logIP();
  const requestListener = function (req, res) {
    const urls = req.url;
    let urls_splitted, params;

    // check if url contains ?
    if (urls.includes("?")) {
      // split url and get the first part
       urls_splitted = urls.split("?")[0];
      // parameter part
       params = urls.split("?")[1];
    }

    switch (urls_splitted) {
      case "/connect":
        res.writeHead(200);
        res.end("connected Successfully");
        console.log(params);
        break;
      case "/addItem":
        res.writeHead(200);
        res.end("addItem Successfully" + params);
        break;
      case "/availabilityItem":
        res.writeHead(200);
        res.end("10 items available");
        break;

      default:
        res.writeHead(404);
        res.end("Not Found!");
        break;
    }
  };

  const server = http.createServer(requestListener);
  server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
  });

}
  // import fs
  const fs = require("fs");

  // open json file and write data to it
  data = {
    usernname: "Seller1",
    email: "jjjgmail.coom",
    phone: "1234567890",
    password: "1234567890",
    bussinessCategory: "Electronics",
    bussinessName: "jakffibgi",
    sellerName: "bvfvf",
  }
  fs.writeFile("settings/sellerinfo.json" , JSON.stringify(data) , (err) => {   
    // write data to file
    if (err) throw err;
  });