
for (let i=0; i<30; i++) {
	let row = document.createElement('div')
	row.classList.add('row')

	for (let j=0; j<17; j++) {
		let tile = document.createElement('div')
		tile.classList.add('tile')
		row.appendChild(tile)
	}

	document.getElementById('background').appendChild(row)
}

document.addEventListener('DOMContentLoaded', function () {
    var video = document.getElementById('video-element');

    video.addEventListener('ended', function () {
        video.currentTime = 0;
        video.play();
    });
});
