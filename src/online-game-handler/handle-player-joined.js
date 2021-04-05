import { PlayerList } from "../sidebar/chat-player-list";

function handlePlayerJoined(onlineGame, data) {
    PlayerList.addPlayer(data.playerName);
}

export default handlePlayerJoined;