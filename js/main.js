
import {getData} from './data.js';
import {renderCards} from './render.js';
import {disableForm, enableForm, onRoomChange, adFormValidator} from './form.js';

const data = getData(1);
renderCards(data);
disableForm();
enableForm();

const roomSelect = document.querySelector('#room_number');

roomSelect.addEventListener('change', () => {
  onRoomChange(roomSelect.value);
});

onRoomChange(roomSelect.value);

const form = document.querySelector('.ad-form');

const pristineConfig = {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'div',
  errorTextClass: 'text-help'
};

const pristine = new Pristine(form, pristineConfig);

adFormValidator(pristine);
