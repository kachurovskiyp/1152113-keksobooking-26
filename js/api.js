import { showAlert, showStatus } from './until.js';

const LOAD_DATA_SERVER = 'https://26.javascript.pages.academy/keksobooking/data';
const SEND_DATA_SERVER = 'https://26.javascript.pages.academy/keksobooking';

const loadData = (onSuccess) => {
  fetch(LOAD_DATA_SERVER)
    .then((response) => {
      if(response.ok) {
        return response.json()
      }
      throw new Error(err);
    })
    .then(onSuccess)
    .catch((err) => {
      showAlert(err.message);
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
      return;
    }
    throw new Error(`${response.status} ${response.statusText}`);
  })
  .catch(() => {
    showStatus('error');
  })
}

export {loadData, sendData};
