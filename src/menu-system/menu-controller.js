
const MenuController = (() => {
    const title = document.querySelector('#menu-title');
    const menuContainer = document.querySelector('#menu-button-container');

    function emptyMenu() {
        menuContainer.innerHTML = '';
    }

    function setMenu(menuObject) {
        emptyMenu();
        for (const buttonElement of menuObject.buttons) {
            menuContainer.appendChild(buttonElement);
        }
        title.innerHTML = menuObject.titleInnerHTML;
    }
    return({ setMenu });
})();

export default MenuController;