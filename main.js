const { app, BrowserWindow, Tray, Menu } = require('electron');

let window;
let trayContextMenu;
let appIcon;
const iconPath = `./dist/password-manager/assets/images/key.png`;

function createContextMenu() {
  trayContextMenu = Menu.buildFromTemplate([
    { label: 'Show App',
      click: () => {
        window.show();
      }},
    { label: 'Quit',
      click: () => {
        app.isQuiting = true;
        app.quit();
      }
    }
  ]);
}

function createWindow() {
  window = new BrowserWindow({
    width: 1280,
    height: 768,
    icon: iconPath,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      devTools: false,
    },
  });
}

function windowLoad() {
  appIcon = new Tray(iconPath);
  appIcon.setContextMenu(trayContextMenu);
  window.loadURL(`file://${__dirname}/dist/password-manager/index.html`);
}

function watchWindowEvents() {
  window.on('minimize', (event) => {
    event.preventDefault();
    window.hide();
  });

  window.on('close', (event) => {
    if(!app.isQuiting){
      event.preventDefault();
      window.hide();
    }
    return false;
  });

  window.on('closed', () => {
    window = null;
  });

  window.on('show', () => {
    appIcon.setHighlightMode('always');
  });
}

function init() {
  createContextMenu();
  createWindow();
  windowLoad();
  watchWindowEvents();
}

// Create window on electron intialization
app.on('ready', init);

// Quit when all windows are closed.
app.on('window-all-closed', () => {

  // On macOS specific close process
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // macOS specific close process
  if (window === null) {
    init();
  }
});
