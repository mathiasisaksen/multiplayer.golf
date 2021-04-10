function addBlur() {
    const main = document.querySelector('main');
    main.classList.add('blur');
}

function removeBlur() {
    const main = document.querySelector('main');
    main.classList.remove('blur');
}

export { addBlur, removeBlur }