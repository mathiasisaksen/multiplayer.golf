import dialogBox from "../menu-system/dialog-box";

function handleGeneralError(data) {
    dialogBox(`Error: ${data.errorDescription}`,
        [{text: 'Ok', callback: () => alert('Ok')}, {text: 'No'}]);
}

export default handleGeneralError;