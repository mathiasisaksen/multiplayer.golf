import { menuConfig } from '../config';
import mainMenu from './main-menu';

const MenuController = (() => {
    const menuWrapper = document.querySelector('#menu-wrapper');
    let menuObject;
    let menuElement;

    function setElementTransition(element, position, duration, timingFunction = 'ease-in-out') {
        element.style.transitionDuration = `${duration}s`;
        element.style.transform = `translateX(${position}px)`;
        element.style.transitionTimingFunction = timingFunction;
    }

    // Should probably be split into multiple functions
    function setMenu(newMenuObject, forWardDirection = true, skipTransition = false) {
        
        // On the first run, menuObject does not have a value
        // Later, we start by setting the old menu to in-active.
        // This disables all button events
        if (menuObject) {
            menuObject.setNotActive();
        }

        // Set new menu to active, enabling button events
        let oldMenuObject = menuObject;
        menuObject = newMenuObject;
        
        // Should the the new menu come in from the left, or the right?
        let directionSign = forWardDirection ? 1 : -1;
        // How long should the transition take?
        let duration = menuConfig.transitionDuration;

        // Store old menu for later, and update menuElement to new menu
        let oldMenu = menuElement;
        menuElement = newMenuObject.getMenuElement();
        menuWrapper.insertBefore(menuElement, menuWrapper.firstChild);

        // Remove any transition events
        if (oldMenu) {
            oldMenu.ontransitionstart = '';
            oldMenu.ontransitionend = '';
        }
        menuElement.ontransitionstart = '';
        menuElement.ontransitionend = '';

        // Computing how far the menu elements should slide, when transitioning
        // out of/in to the screen
        const screenWidth = document.body.offsetWidth;
        let oldMenuWidth;
        const newMenuWidth = menuElement.offsetWidth;
        if (oldMenu) {
            oldMenuWidth = oldMenu.offsetWidth;
        }
        const maxMenuWidth = Math.max(newMenuWidth, oldMenuWidth);
        const transitionOffset = (screenWidth + maxMenuWidth) / 2;

        // Move new menu to initial position outside the screen, without
        // transitioning
        if (!skipTransition) {
            setElementTransition(menuElement, directionSign * transitionOffset, 0);
        }

        // Start exit transition of old menu
        if (oldMenu && !skipTransition) {
            setElementTransition(oldMenu, - directionSign * transitionOffset, duration, 'ease-in-out');
            oldMenu.addEventListener('transitionstart', e => {
                if (e.target != oldMenu) return;
                startNewMenuEntry();
            });
            oldMenu.addEventListener('transitionend', e => {
                if (e.target != oldMenu) return;
                oldMenuObject.clearInput();
                oldMenu.removeAttribute('style');
                oldMenu.remove();
                oldMenu = null;
            });
        }
        
        // Start entry transition of new menu
        function startNewMenuEntry() {
            setElementTransition(menuElement, 0, duration, 'ease-in-out');
            menuElement.addEventListener('transitionend', e => {
                if (e.target != menuElement) return;
                menuElement.removeAttribute('style');
                menuObject.setActive();
            });
        }
        
        if (skipTransition) {
            menuObject.setActive();
        }
    }

    function hide() {
        menuWrapper.classList.add('hidden');
        menuWrapper.innerHTML = '';
        menuObject.setNotActive();
        menuObject = null;
        menuElement = null;
    }

    function show() {
        menuWrapper.classList.remove('hidden');
        setMenu(mainMenu, true, true);
    }

    return({ setMenu, hide, show });
})();

export default MenuController;