function getRandomPositiveInteger (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function getRandomPositiveFloat (a, b, digits = 1) {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(digits);
}

function getRamdonArrayEL(array) {
  return array[getRandomPositiveInteger(1, array.length - 1)];
}

function shuffleArray(array) {
  let j, temp;

  for(let i = array.length - 1; i > 0; i--){
    j = Math.floor(Math.random()*(i + 1));
    temp = array[j];
    array[j] = array[i];
    array[i] = temp;
  }

  return array;
}

const ALERT_SHOW_TIME = 3000;

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
}

const showStatus = (status) => {
  const popup = document.querySelector(`#${status}`).cloneNode(true);
  document.body.append(popup.content);
  const message = document.querySelector(`.${status}`);

  const closeMessage = () => {
    message.remove();
    window.removeEventListener('click', onClick);
    window.removeEventListener('keydown', onEscPress);
  }

  const onClick = () => {
    closeMessage();
  };

  const onEscPress = (evt) => {
    if(evt.key === 'Escape') {
      closeMessage();
    }
  };

  window.addEventListener('click', onClick);
  window.addEventListener('keydown', onEscPress);
};

export {
  getRandomPositiveInteger,
  getRandomPositiveFloat,
  getRamdonArrayEL,
  shuffleArray,
  showAlert,
  showStatus
};
