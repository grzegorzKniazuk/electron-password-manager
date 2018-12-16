const { app, BrowserWindow } = require('electron');

let win;

function createWindow () {
  win = new BrowserWindow({
    width: 1366,
    height: 768,
    icon: `./dist/password-manager/assets/images/key.png`,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      devTools: false,
    },
  });

  win.loadURL(`file://${__dirname}/dist/password-manager/index.html`);

  // Event when the window is closed.
  win.on('closed', function () {
    win = null
  });
}

// Create window on electron intialization
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {

  // On macOS specific close process
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // macOS specific close process
  if (win === null) {
    createWindow();
  }
});
