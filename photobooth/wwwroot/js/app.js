var photoCount = 4;

var imgCapture;

function start() {
    document.getElementById('start').classList.add('hide');
    document.body.classList.add('blacken');
    document.getElementsByTagName('video')[0].classList.add('show');
    document.getElementById('countdown').classList.add('show');
    document.getElementsByTagName('audio')[0].play();
    setTimeout(startSequence, 3000);
}

function flash() {
    var flash = document.getElementById('flash');
    flash.classList.add('show');
    capAndUpload();
    setTimeout(function() {
        flash.classList.remove('show');
    }, 100);
}

function capAndUpload() {
    console.log('Capturing and uploading...');
    imgCapture.takePhoto().then(function(blob) {
        var ajax = new XMLHttpRequest();
        ajax.loadend = uploadDone;
        ajax.open('POST', './upload', true);
        ajax.send(blob);
    });
}

function uploadDone(e) {
    console.log('Uploaded file.');
}

var constraints = { audio: false, video: { width: 1620, height: 1080 } };

navigator.mediaDevices.getUserMedia(constraints)
    .then(function (mediaStream) {
        var video = document.getElementsByTagName('video')[0];
        video.srcObject = mediaStream;
        video.onloadedmetadata = function (e) {
            video.play();
        };
        imgCapture = new ImageCapture(mediaStream.getVideoTracks()[0]);
    })
    .catch(function (err) { console.log(err.name + ': ' + err.message); }); // always check for errors at the end.

function startCountDown() {
    var countdown = 6;
    var interval = setInterval(function() {
        document.getElementById('countdown').innerText = --countdown;
    }, 1000);
    setTimeout(function() {
        clearInterval(interval);
        flash();
        document.getElementById('countdown').innerText = '...';
    }, 6000);
}

function startSequence() {
    for (var i = 0; i < photoCount; ++i) {
        setTimeout(startCountDown, i * 10000)
    }
    setTimeout(function() {
        location.reload();
    }, photoCount * 10000 + 5000);
}