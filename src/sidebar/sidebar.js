import ScoreBoard from './score-board';
import MenuController from '../menu-system/menu-controller';
import ChatBox from './chat-box';
import dialogBox from '../menu-system/dialog-box';
import PlayerList from './player-list';
import OnlineGameHandler from '../online-game-handler/online-game-handler';

const Sidebar = (() => {
    const gameContainer = document.querySelector('#game-container');
    const sidebarBody = document.querySelector('#sidebar-body');
    const sideBarElement = document.querySelector('#sidebar');

    const toggleSidebarButton = document.querySelector('#sidebar-toggle');
    toggleSidebarButton.addEventListener('click', handleToggleSidebar);

    const currentCourseElement = document.querySelector('#current-course-number');
    const totalCoursesElement = document.querySelector('#total-number-of-courses');

    let isCollapsed = false;
    let numberOfCourses;
    let currentCourseNumber = 1;

    function setNumberOfCourses(numCourses) {
        numberOfCourses = numCourses;
        totalCoursesElement.textContent = numberOfCourses;
    }

    function getNumberOfCourses() {
        return(numberOfCourses);
    }

    function setCurrentCourse(courseNumber) {
        currentCourseNumber = courseNumber;
        currentCourseElement.textContent = currentCourseNumber;
    }

    function incrementCurrentCourse() {
        currentCourseNumber++;
        currentCourseElement.textContent = currentCourseNumber;
    }

    const exitButton = document.querySelector("#sidebar-exit-button");
    exitButton.addEventListener('click', handleExit);

    function handleToggleSidebar() {
        if (isCollapsed) {            
            sidebarBody.classList.remove('hidden');
            sideBarElement.removeAttribute('style');
        } else {
            sidebarBody.classList.add('hidden');
            sideBarElement.style.bottom = 'initial';
        }
        isCollapsed = !isCollapsed;
        console.log(isCollapsed);
    }

    function handleExit() {
        const buttonCallbacks = [];
        // TODO: Clean up properly before leaving
        buttonCallbacks.push({text: 'Leave game', callback: () => {
            OnlineGameHandler.hideGame();
            OnlineGameHandler.exit();
        }});
        buttonCallbacks.push({text: 'Cancel'});
        dialogBox('Are you sure you want to leave the game?', buttonCallbacks);
    }

    // Setup players/chat section
    const chatPlayersEnum = {PLAYERS: 'players', CHAT: 'chat'}
    let currentChatOrPlayers = chatPlayersEnum.CHAT;
    const playerButton = sidebarBody.querySelector('#show-players');
    playerButton.addEventListener('click', handlePlayerClick);
    const chatButton = sidebarBody.querySelector('#show-chat');
    chatButton.addEventListener('click', handleChatClick);
    const chatPlayerTitle = sidebarBody.querySelector('#chat-player-title');

    function handlePlayerClick() {
        if (currentChatOrPlayers === chatPlayersEnum.PLAYERS) return;
        currentChatOrPlayers = chatPlayersEnum.PLAYERS;

        ChatBox.hide();
        PlayerList.show();

        chatButton.classList.remove('chat-player-selected');
        playerButton.classList.add('chat-player-selected');
        chatPlayerTitle.textContent = currentChatOrPlayers;
    }

    function handleChatClick() {
        if (currentChatOrPlayers === chatPlayersEnum.CHAT) return;
        currentChatOrPlayers = chatPlayersEnum.CHAT;
        
        ChatBox.show();
        PlayerList.hide();

        playerButton.classList.remove('chat-player-selected');
        chatButton.classList.add('chat-player-selected');
        chatPlayerTitle.textContent = currentChatOrPlayers;
    }

    function show() {
        gameContainer.classList.remove('hidden');
    }

    function hide() {
        gameContainer.classList.add('hidden');
    }
    return({show, hide, setNumberOfCourses, getNumberOfCourses,
        incrementCurrentCourse, setCurrentCourse})
})();

export default Sidebar;