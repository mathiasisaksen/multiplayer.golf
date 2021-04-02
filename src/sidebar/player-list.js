import { sidebarConfig } from '../config';
import ChatBox from "./chat-box";
import { generateDistinctColor } from '../utilities/color-utilities';

const PlayerList = (() => {
    const playerListContainer = document.querySelector('#player-list-container');
    const playerArray = [];
    const playerColorMap = {};

    function addPlayer(playerName) {
        playerArray.push(playerName);
        playerColorMap[playerName] = generateDistinctColor(playerArray.length, 
            sidebarConfig.userNameSaturation, 
            sidebarConfig.userNameBrightness);
        
        insertToDOM(playerName);
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
    }

    function hide() {
        playerListContainer.classList.add('hidden');
    }

    function show() {
        playerListContainer.classList.remove('hidden');
    }

    addPlayer('Mathias');

    return({ show, hide, getPlayerColor });
})();

export default PlayerList;