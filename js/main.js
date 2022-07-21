
import {getData} from './data.js';
import {renderCards} from './render.js';
import {disableForm, enableForm, onRoomChange} from './form.js';

const data = getData(1);
renderCards(data);
disableForm();
enableForm();

const roomSelect = document.querySelector('#room_number');

roomSelect.addEventListener('change', () => {
  onRoomChange(roomSelect.value);
});

onRoomChange(roomSelect.value);
