import ScoreBoard from './score-board';
import MenuController from '../menu-system/menu-controller';
import ChatBox from './chat-box';

const Sidebar = (() => {
    const gameContainer = document.querySelector('#game-container');

    const chatPlayersEnum = {PLAYERS: 'players', CHAT: 'chat'}
    let currentChatOrPlayers = chatPlayersEnum.PLAYERS;

    const toggleSidebarButton = document.querySelector('#sidebar-toggle');
    toggleSidebarButton.addEventListener('click', () => sidebarBody.classList.toggle('hidden'));

    const exitButton = document.querySelector("#sidebar-exit-button");
    exitButton.addEventListener('click', () => {
        gameContainer.classList.add('hidden');
        MenuController.showMenu();
    })

    const sidebarBody = document.querySelector('#sidebar-body');

    // Setup course section
    

    // Setup players/chat section
    const playerButton = sidebarBody.querySelector('#show-players');
    playerButton.addEventListener('click', handlePlayerClick);
    const chatButton = sidebarBody.querySelector('#show-chat');
    chatButton.addEventListener('click', handleChatClick);
    const chatPlayerTitle = sidebarBody.querySelector('#chat-player-title');

    function handlePlayerClick() {
        if (currentChatOrPlayers === chatPlayersEnum.PLAYERS) return;
        currentChatOrPlayers = chatPlayersEnum.PLAYERS;

        chatButton.classList.remove('chat-player-selected');
        playerButton.classList.add('chat-player-selected');
        chatPlayerTitle.textContent = currentChatOrPlayers;
    }

    function handleChatClick() {
        if (currentChatOrPlayers === chatPlayersEnum.CHAT) return;
        currentChatOrPlayers = chatPlayersEnum.CHAT;
        
        playerButton.classList.remove('chat-player-selected');
        chatButton.classList.add('chat-player-selected');
        chatPlayerTitle.textContent = currentChatOrPlayers;
    }


})();

export default Sidebar;