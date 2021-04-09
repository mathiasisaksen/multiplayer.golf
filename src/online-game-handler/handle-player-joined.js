import ChatBox from "../sidebar/chat-box";
import PlayerList from "../sidebar/player-list";

function handlePlayerJoined(data) {
    PlayerList.addPlayer(data.playerName);
    ChatBox.receiveAnnouncement(`${data.playerName} has joined the game`);
}

export default handlePlayerJoined;