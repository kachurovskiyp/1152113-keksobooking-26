import {
  onRoomChange,
  onTypeChange,
  onInTimeChange,
  onOutTimeChange,
  adFormValidator
} from './form.js';

import { mapInit } from './map.js';

const form = document.querySelector('.ad-form');
const roomSelect = form.querySelector('#room_number');
const typeInput = form.querySelector('#type');
const timeInSelect = form.querySelector('#timein');
const timeOutSelect = form.querySelector('#timeout');

const pristineConfig = {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'div',
  errorTextClass: 'text-help'
};

const pristine = new Pristine(form, pristineConfig);

roomSelect.addEventListener('change', () => {
  onRoomChange(roomSelect.value);
});

typeInput.addEventListener('change', () => {
  onTypeChange();
});

timeInSelect.addEventListener('change', () => {
  onInTimeChange();
});

timeOutSelect.addEventListener('change', () => {
  onOutTimeChange();
});

adFormValidator(pristine);
onRoomChange(roomSelect.value);
onTypeChange();

mapInit();
