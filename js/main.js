
import {getData} from './data.js';
import {renderCard} from './render.js';
import {disableForm, enableForm, onRoomChange, onTypeChange, onInTimeChange, onOutTimeChange, adFormValidator} from './form.js';
const form = document.querySelector('.ad-form');

//renderCards(data);
disableForm();
const roomSelect = form.querySelector('#room_number');
const typeInput = form.querySelector('#type');
const timeInSelect = form.querySelector('#timein');
const timeOutSelect = form.querySelector('#timeout');
const addressInput = form.querySelector('#address');

addressInput.setAttribute('readonly', 'readonly');

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

const tokioLatLng = {lat: 35.701147508168674, lng: 139.7822078445013};
const data = getData(5);

const map = L.map('map-canvas')
  .on('load', () => {
    enableForm();
  })
  .setView({
    lat: tokioLatLng.lat,
    lng: tokioLatLng.lng,
  }, 9);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainMarker = L.marker(
  {
    lat: tokioLatLng.lat,
    lng: tokioLatLng.lng,
  },
  {
    draggable: true,
    icon: mainPinIcon
  },
);

mainMarker.addTo(map);

mainMarker.on('moveend', (evt) => {
  addressInput.value = `lat: ${evt.target.getLatLng().lat},  lng:${evt.target.getLatLng().lng}`;
});

const pinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

data.forEach((dataItem) => {
  const marker = L.marker(
    {
      lat: dataItem.location.lat,
      lng: dataItem.location.lng,
    },
    {
      icon: pinIcon
    },
  );
  marker.addTo(map).bindPopup(renderCard(dataItem));
});
