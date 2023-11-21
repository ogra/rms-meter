import { Indicator } from './node_modules/rms-meter/dist/rms-meter.esm.js';

const recordButton = document.querySelector('#record');
const pauseButton = document.querySelector('#pause');
const micSelect = document.querySelector('#mic-select');
let mediaRecorder = null;
let recording = false;
let paused = false;
let intervalId = null;

function startStopRecording() {
    if (recording) {
        recording = false;
        mediaRecorder.stop();
        pauseButton.style.display = "none";
        recordButton.innerText = "Record";
        clearInterval(intervalId);
        // process recorded data
    } else {
        recording = true;
        mediaRecorder.start();
        pauseButton.style.display = "initial";
        recordButton.innerText = "Stop";
        intervalId = setInterval(() => {
            mediaRecorder.requestData();
        }, 100);
    }
}

function pauseResumeRecording() {
    if (paused) {
        mediaRecorder.resume();
        recording = true;
        pauseButton.innerText = "Pause";
        paused = false;
    } else {
        mediaRecorder.pause();
        recording = false;
        pauseButton.innerText = "Resume";
        paused = true;
    }
}

navigator.mediaDevices.enumerateDevices().then((devices) => {
    devices.forEach((device) => {
        if (device.kind === "audioinput") {
            const option = document.createElement('option');
            option.value = device.deviceId;
            option.text = device.label || device.deviceId;
            micSelect.appendChild(option);
        }
    });
});

micSelect.addEventListener('change', () => {
    const indicatorParent = document.getElementById('indicator');
    while (indicatorParent.firstChild) {
        indicatorParent.removeChild(indicatorParent.firstChild);
    }
    navigator.mediaDevices.getUserMedia({ audio: { deviceId: micSelect.value } }).then(stream => {
        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.addEventListener('dataavailable', (e) => {
        });
        const rmsMeter = Indicator.create({ elementId: 'indicator', userMediaStream: stream });
    });
});

recordButton.addEventListener('click', startStopRecording);
pauseButton.addEventListener('click', pauseResumeRecording);
