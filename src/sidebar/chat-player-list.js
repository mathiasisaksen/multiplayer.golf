import { sidebarConfig } from '../config';
import { generateDistinctColor } from '../utilities/color-utilities';

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
        inputElement.value = '';
        receiveMessage(localPlayerName, inputText);
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

const PlayerList = (() => {
    const playerListContainer = document.querySelector('#player-list-container');
    const playerArray = [];
    const playerElementMap = {};
    const playerColorMap = {};

    function addPlayer(playerName) {
        playerArray.push(playerName);
        playerColorMap[playerName] = generateDistinctColor(playerArray.length, 
            sidebarConfig.userNameSaturation, 
            sidebarConfig.userNameBrightness);
        
        playerElementMap[playerName] = insertToDOM(playerName);
        ChatBox.receiveAnnouncement(`${playerName} has joined the game`);

    }

    function removePlayer(playerName) {
        const index = playerArray.findIndex(name => name === playerName);
        if (index === -1) return;
        
        delete playerArray[index];
        delete playerColorMap[playerName];
        playerElementMap[playerName].remove();
        delete playerElementMap[playerName];
        
        ChatBox.receiveAnnouncement(`${playerName} has left the game`);
    }

    function getPlayerColor(playerName) {
        if (!(playerName in playerColorMap)) {
            playerColorMap[playerName] = generateDistinctColor(playerArray.length, 
                sidebarConfig.userNameSaturation, 
                sidebarConfig.userNameBrightness);
        }
        return(playerColorMap[playerName]);
    }

    function insertToDOM(playerName) {
        const newPlayerElement = document.createElement('div');
        newPlayerElement.classList.add('player-list-element');
        newPlayerElement.style.backgroundColor = getPlayerColor(playerName);
        newPlayerElement.textContent = playerName;
        
        playerListContainer.appendChild(newPlayerElement);
        return(newPlayerElement);
    }

    function hide() {
        playerListContainer.classList.add('hidden');
    }

    function show() {
        playerListContainer.classList.remove('hidden');
    }

    function clear() {
        playerListContainer.innerHTML = '';
        playerArray = [];
        playerElementMap = {};
        playerColorMap = {};
    }

    addPlayer('Mathias');

    return({ addPlayer, removePlayer, show, hide, getPlayerColor, clear });
})();

export {PlayerList, ChatBox};
