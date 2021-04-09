import ChatBox from "../sidebar/chat-box";

function handleMessageReceived(data) {
    ChatBox.receiveMessage(data.playerName, data.message);
}

export default handleMessageReceived;