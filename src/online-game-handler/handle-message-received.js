import ChatBox from "../sidebar/chat-box";

function handleMessageReceived(onlineGame, data) {
    ChatBox.receiveMessage(data.playerName, data.message);
}

export default handleMessageReceived;