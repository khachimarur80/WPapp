const { app, BrowserWindow, screen, Menu, Tray, dialog, nativeImage } = require('electron');
const Store = require('electron-store');
const path = require('path');

let mainWindow;
let tray;
let selectedVideoPath;

const store = new Store();

const trayIcon = nativeImage.createFromPath(path.join(__dirname, 'src', 'assets', 'wallpaper.png'));

app.dock.hide()
app.on('ready', () => {
    tray = new Tray(trayIcon);
    const contextMenu = Menu.buildFromTemplate([
        { type: 'separator' },
        {
            label: 'Select Video',
            click: async () => {
                const result = await dialog.showOpenDialog({
                    filters: [{ name: 'Video Files', extensions: ['mp4', 'avi', 'mkv'] }],
                    properties: ['openFile'],
                });

                if (!result.canceled && result.filePaths.length > 0) {
                    const selectedVideoPath = result.filePaths[0];

                    store.set('selectedVideoPath', selectedVideoPath);
                    mainWindow.webContents.send('video-file', selectedVideoPath);
                }
            },
        },
        {
            label: 'Remove Video',
            click: () => {
                store.set('selectedVideoPath', '');
                mainWindow.webContents.send('video-file', ''); 
            }
        },
        {
            label: 'Close',
            click: () => {
                app.quit();
            },
        },
    ]);


    selectedVideoPath = store.get('selectedVideoPath');

    tray.setToolTip(`Selected Video: ${selectedVideoPath || 'None'}`);
    tray.setContextMenu(contextMenu);

    const { width, height } = screen.getPrimaryDisplay().workAreaSize;

    mainWindow = new BrowserWindow({
        width: 1920,
        height: 1080,
        type: "desktop",
        frame: false,
        transparent: true,
        roundedCorners: false,
        skipTaskbar: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
        },

    });
    mainWindow.loadFile('./src/index.html');
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
        mainWindow.webContents.send('video-file', selectedVideoPath);
    });
    mainWindow.on('closed', () => {
        app.quit();
    });
});
