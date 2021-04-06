import { sidebarConfig } from '../config';
import { generateDistinctColor } from '../utilities/color-utilities';

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
    }

    function removePlayer(playerName) {
        const index = playerArray.findIndex(name => name === playerName);
        if (index === -1) return;
        
        delete playerArray[index];
        delete playerColorMap[playerName];
        playerElementMap[playerName].remove();
        delete playerElementMap[playerName];
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

    return({ addPlayer, removePlayer, show, hide, getPlayerColor, clear });
})();

export default PlayerList;