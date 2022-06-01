import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const VIDEO_STORAGE_KEY = "videoplayer-current-time";

player.on('timeupdate', throttle(saveCurrentTime, 1000));
resumePlayback();

function saveCurrentTime(data) {
    localStorage.setItem(VIDEO_STORAGE_KEY, data.seconds);
};

function resumePlayback() {
    const previousSavedTime = localStorage.getItem(VIDEO_STORAGE_KEY);
    if (previousSavedTime) {
        player.setCurrentTime(previousSavedTime);
    };
};
