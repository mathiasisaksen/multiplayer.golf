import MenuController from "../menu-system/menu-controller";
import Sidebar from "../sidebar/sidebar";

function handleGameCreationSuccessful(onlineGame, data) {
    console.log(data);
    onlineGame.show();
    Sidebar.show();
    MenuController.hide();
    onlineGame.setPlayerId(data.playerId);
    console.log(onlineGame.getPlayerId());
}

export default handleGameCreationSuccessful;