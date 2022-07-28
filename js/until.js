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
};

const showStatus = (status) => {
  const popup = document.querySelector(`#${status}`).cloneNode(true);
  document.body.append(popup.content);

  const message = document.querySelector(`.${status}`);

  const onClick = () => {
    closeMessage();
  };

  const onEscPress = (evt) => {
    if(evt.key === 'Escape') {
      closeMessage();
    }
  };

  function closeMessage () {
    message.remove();
    window.removeEventListener('click', onClick);
    window.removeEventListener('keydown', onEscPress);
  }

  window.addEventListener('click', onClick);
  window.addEventListener('keydown', onEscPress);
};

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {showAlert, showStatus, debounce};
