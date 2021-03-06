import OnlineGameHandler from '../online-game-handler/online-game-handler';
import PlayerList from './player-list';

const ChatBox = (() => {
    const chatBoxContainer = document.querySelector('#chat-box-container');
    const chatBoxElement = document.querySelector('#chat-box');
    
    const inputElement = document.querySelector('#chat-input');
    inputElement.addEventListener('keydown', event => {
        if (event.key !== "Enter") return;
        handleSendMessage();
    })
    
    const sendButton = document.querySelector('#chat-send-message-button');
    sendButton.addEventListener('click', handleSendMessage);
    
    let localPlayerName;

    function handleSendMessage() {
        const inputText = inputElement.value;
        inputElement.focus();
        if (!inputText.trim()) return;
        const gameId = OnlineGameHandler.getGameId();
        const playerId = OnlineGameHandler.getPlayerId();
        
        const message = {};
        message.eventName = 'messageSent';
        message.data = {gameId, playerId, message: inputText};
        OnlineGameHandler.sendMessage(JSON.stringify(message));

        inputElement.value = '';
        //receiveMessage(localPlayerName, inputText);
    }

    function receiveMessage(playerName, message) {
        const newChatElement = document.createElement('div');
        newChatElement.classList.add('chat-element');

        newChatElement.innerHTML = 
            `<span class="chat-playername"></span>: `+ 
            `<span class="chat-message"></span>`;

        const nameElement = newChatElement.querySelector('.chat-playername');
        const messageElement = newChatElement.querySelector('.chat-message');

        // Set textContent to avoid XSS
        nameElement.textContent = playerName;
        nameElement.style.color = PlayerList.getPlayerColor(playerName);
        messageElement.textContent = message;

        chatBoxElement.insertBefore(newChatElement, chatBoxElement.firstChild);
    }

    function setLocalPlayerName(playerName) {
        localPlayerName = playerName;
    }

    function receiveAnnouncement(announcement) {
        const newChatElement = document.createElement('div');
        newChatElement.classList.add('chat-element', 'chat-announcement');
        newChatElement.textContent = announcement;

        chatBoxElement.insertBefore(newChatElement, chatBoxElement.firstChild);
    }

    function hide() {
        chatBoxContainer.classList.add('hidden');
    }

    function show() {
        chatBoxContainer.classList.remove('hidden');

    }

    function clear() {
        chatBoxElement.innerHTML = '';
        localPlayerName = null;
    }

    return({ receiveMessage, setLocalPlayerName, receiveAnnouncement,
        show, hide, clear });
})();

export default ChatBox;
