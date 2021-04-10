import dialogBox from "../menu-system/dialog-box";

function handleGeneralError(data) {
    dialogBox(`Error: ${data.errorDescription}`,
        [{text: 'Ok'}]);
}

export default handleGeneralError;