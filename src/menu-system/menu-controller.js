import { menuConfig } from '../config';

const MenuController = (() => {
    const menuWrapper = document.querySelector('#menu-wrapper');
    let menuObject;
    let menuElement;
    let titleElement;
    let buttonContainer;

    function emptyMenu() {
        return;
        buttonContainer.classList.add('transition-out');
        buttonContainer.innerHTML = '';
        titleElement.innerHTML = '';
        titleElement.classList = '';
    }

    function setMenu(newMenuObject, forWardDirection = true, skipTransition = false) {
        if (menuObject) {
            menuObject.setNotActive();
        }

        newMenuObject.setActive();
        menuObject = newMenuObject;
        let directionSign = forWardDirection ? 1 : -1;
        let duration = menuConfig.transitionDuration;
        let oldMenu = menuElement;
        menuElement = newMenuObject.menuElement;
        menuWrapper.insertBefore(menuElement, menuWrapper.firstChild);

        const screenWidth = document.body.offsetWidth;
        let oldMenuWidth;
        const newMenuWidth = menuElement.offsetWidth;
        if (oldMenu) {
            oldMenuWidth = oldMenu.offsetWidth;
        }
        const maxMenuWidth = Math.max(newMenuWidth, oldMenuWidth);
        const transitionOffset = (screenWidth + maxMenuWidth) / 2;

        if (!skipTransition) {
            let newMenuWidth = menuElement.offsetWidth;
            menuElement.style.transitionDuration = '0s';
            menuElement.style.transform = `translateX(${directionSign * transitionOffset}px)`;
        }

        if (oldMenu && !skipTransition) {
            oldMenu.style.transitionDuration = duration;
            oldMenu.style.transform = `translateX(${- directionSign * transitionOffset}px)`;
            oldMenu.addEventListener('transitionend', e => {
                if (e.target != oldMenu) return;
                console.log(e);
                oldMenu.remove();
                oldMenu = null;
            });
        }
        
        if (!skipTransition) {
            setTimeout(() => {
                menuElement.style.transitionDuration = duration;
                menuElement.style.transform = 'translateX(0px)';
                menuElement.addEventListener('transitionend', e => {
                    if (e.target != menuElement) return;
                    menuElement.style = '';
                });
            }, 0);
        }
        
        return;
    }
    return({ setMenu });
})();

export default MenuController;