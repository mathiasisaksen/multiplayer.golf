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
    addPlayer('Mathias2');
    addPlayer('Mathias3');
    addPlayer('Mathias4');
    addPlayer('Mathias5');
    addPlayer('Mathias6');
    addPlayer('Mathias7');
    addPlayer('Mathias8');
    addPlayer('Mathias9');
    addPlayer('Mathias10');
    addPlayer('Mathias11');
    addPlayer('Mathias12');
    addPlayer('Mathias13');
    addPlayer('Mathias14');
    addPlayer('Mathias15');
    addPlayer('Mathias16');
    addPlayer('Mathias17');
    addPlayer('Mathias18');
    addPlayer('Mathias19');
    addPlayer('Mathias20');
    addPlayer('Mathias21');
    addPlayer('Mathias22');
    addPlayer('Mathias23');
    addPlayer('Mathias24');



    return({ show, hide, getPlayerColor });
})();

export default PlayerList;