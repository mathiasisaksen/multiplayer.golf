import { addBlur, removeBlur } from "./blur";

function dialogBox(prompt, buttonCallbackArray) {
    addBlur();

    const htmlString = 
        `<div class='dialog-box-wrapper not-selectable'>
            <div class='backdrop'></div>
            <div class='dialog-box'>
                <div class='dialog-box-description'>${prompt}</div>
                <div class='dialog-box-button-container'>
                </div>
            </div>
        </div>`
    const dialogContainer = document.createElement('div');
    dialogContainer.innerHTML = htmlString;

    const buttonContainer = dialogContainer.querySelector('.dialog-box-button-container');

    for (const button of buttonCallbackArray) {
        const buttonElement = document.createElement('div');
        buttonElement.classList.add('dialog-box-button');
        buttonElement.textContent = button.text;

        function buttonClickHandler(event) {
            removeBlur();
            dialogContainer.remove();
            if (typeof button.callback === 'function') {
                button.callback(event);
            }
        }
        buttonElement.addEventListener('click', buttonClickHandler);
        buttonContainer.appendChild(buttonElement);
    }
    document.body.appendChild(dialogContainer);
}

export default dialogBox;