import { gameConfig } from "../config";

const announcementElement = document.querySelector('#game-announcement');

function showAnnouncement(announcement, callback) {
    announcementElement.textContent = announcement;
    announcementElement.style.opacity = 1;
    announcementElement.addEventListener('transitionend', handleEntryTransitionEnd);

    function handleEntryTransitionEnd() {
        setTimeout(() => {
            announcementElement.style.opacity = 0;
            if (typeof callback === 'function') {
                callback();
            }
            announcementElement.removeEventListener('transitionend', handleEntryTransitionEnd);
            announcementElement.addEventListener('transitionend', handleExitTransitionEnd);
        }, 1000*gameConfig.announcementDuration)
    }

    function handleExitTransitionEnd() {
        announcementElement.textContent = '';
        announcementElement.removeEventListener('transitionend', handleExitTransitionEnd);
    }
}

export default showAnnouncement;