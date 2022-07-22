
import {getData} from './data.js';
import {renderCards} from './render.js';
import {disableForm, enableForm, onRoomChange, onTypeChange, onInTimeChange, onOutTimeChange, adFormValidator} from './form.js';
const form = document.querySelector('.ad-form');
const data = getData(1);
renderCards(data);
disableForm();
enableForm();

const roomSelect = form.querySelector('#room_number');
const typeInput = form.querySelector('#type');
const timeInSelect = form.querySelector('#timein');
const timeOutSelect = form.querySelector('#timeout');

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

const pristineConfig = {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'div',
  errorTextClass: 'text-help'
};

const pristine = new Pristine(form, pristineConfig);

adFormValidator(pristine);
onRoomChange(roomSelect.value);
onTypeChange();
