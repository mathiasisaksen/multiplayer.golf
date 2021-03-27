
const OnlineGameMenu = (() => {
    function setupMenu() {
        MenuController();
        title.textContent = 'Online game';
    }
    return({ setupMenu })
})();

export { StartMenu };

export default OnlineGameMenu;