import { addBlur, removeBlur } from "./blur";

function inputBox(prompt, inputNames, buttonCallbackArray) {
    addBlur();

    const htmlString = 
        `<div class='input-box-wrapper not-selectable'>
        <div class='backdrop'></div>
        <div class='input-box'>
            <div class='input-box-description'>${prompt}</div>
            <div class='input-box-field-container'>
              
            </div>
            <div class='input-box-button-container'>
                
            </div>
        </div>
    </div>`
    const inputBoxContainer = document.createElement('div');
    inputBoxContainer.innerHTML = htmlString;

    const inputFieldContainer = inputBoxContainer.querySelector('.input-box-field-container');
    const buttonContainer = inputBoxContainer.querySelector('.input-box-button-container');
    const nameInputElementMap = {};

    for (const inputName of inputNames) {
        const fieldElement = document.createElement('div');
        fieldElement.classList.add('input-box-field-element');

        const nameElement = document.createElement('div');
        nameElement.classList.add('input-box-parameter-name');
        nameElement.textContent = inputName;
        fieldElement.appendChild(nameElement);

        const inputElement = document.createElement('input');
        inputElement.classList.add('input-box-field-input');
        fieldElement.appendChild(inputElement);

        inputFieldContainer.appendChild(fieldElement);
        nameInputElementMap[inputName] = inputElement;
    }

    for (const button of buttonCallbackArray) {
        const buttonElement = document.createElement('div');
        buttonElement.classList.add('input-box-button');
        buttonElement.textContent = button.text;

        function buttonClickHandler(event) {
            if (typeof button.callback === 'function') {
                button.callback(event, getInputFieldValues());
            }
            removeBlur();
            inputBoxContainer.remove();
        }
        buttonElement.addEventListener('click', buttonClickHandler);
        buttonContainer.appendChild(buttonElement);
    }
    document.body.appendChild(inputBoxContainer);

    function getInputFieldValues() {
        const values = {};
        for (const inputName of inputNames) {
            values[inputName] = nameInputElementMap[inputName].value;
        }
        return(values);
    }
}

export default inputBox;