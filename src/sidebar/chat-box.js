import { messageBoxConfig } from '../config';

function generateRandomColor(h, s, l) {
    if (!h) h = 360*Math.random();
    if (!s) s = 100*Math.random();
    if (!l) l = 100*Math.random();
    return(`hsl(${h}, ${s}%, ${l}%)`);
}

const ChatBox = (() => {
    const chatBox = document.querySelector('#chat-box');
    const playerColorMap = {};

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
        nameElement.style.color = getPlayerColor(playerName);
        console.log(playerColorMap);
        messageElement.textContent = message;

        chatBox.insertBefore(newChatElement, chatBox.firstChild);
    }

    function getPlayerColor(playerName) {
        if (!(playerName in playerColorMap)) {
            playerColorMap[playerName] = generateRandomColor(null, 
                messageBoxConfig.userNameSaturation, 
                messageBoxConfig.userNameBrightness);
        }
        return(playerColorMap[playerName]);
    }
    receiveMessage('Mingus', 'Jazz it up');

})();

export default ChatBox;