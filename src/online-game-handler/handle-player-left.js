import ChatBox from "../sidebar/chat-box";
import PlayerList from "../sidebar/player-list";

function handlePlayerLeft(data) {
    PlayerList.removePlayer(data.playerName);
    ChatBox.receiveAnnouncement(`${data.playerName} has left the game`);
}

export default handlePlayerLeft;