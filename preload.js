const { ipcRenderer } = require('electron');

ipcRenderer.on('video-file', (event, videoPath) => {
    const videoElement = document.getElementById('video-element');
    const background = document.getElementById('background');

    if (videoPath) {
        videoElement.src = videoPath;
        videoElement.load();
        videoElement.style.display = 'block'

        if (background) {
            background.style.display = 'none';
        }
    }
    else {
        videoElement.src = '';
        videoElement.pause();
        videoElement.style.display = 'none'

        if (background) {
            background.style.display = 'flex';
        }
    }
});
