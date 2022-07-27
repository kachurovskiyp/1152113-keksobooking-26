import { showAlert, showStatus } from './until.js';
import { unblockSubmitButton } from './form.js';

const LOAD_DATA_SERVER = 'https://26.javascript.pages.academy/keksobooking/data';
const SEND_DATA_SERVER = 'https://26.javascript.pages.academy/keksobooking';

const loadData = (onSuccess) => {
  fetch(LOAD_DATA_SERVER)
    .then((response) => {
      if(response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch((error) => {
      showAlert(error.message);
    });
};

const sendData = (formData) => {
  fetch(
    SEND_DATA_SERVER,
    {
      method: 'POST',
      body: formData,
    },
  )
    .then((response) => {
      if (response.ok) {
        showStatus('success');
        unblockSubmitButton();
        return;
      }
      throw new Error(`${response.status} ${response.statusText}`);
    })
    .catch(() => {
      showStatus('error');
    });
};

export {loadData, sendData};
