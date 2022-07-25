import { renderCard } from './render.js';
import { enableForm } from './form.js';
import { loadData } from './api.js';

const tokioLatLng = {lat: 35.701147508168674, lng: 139.7822078445013};
const addressInput = document.querySelector('#address');

addressInput.setAttribute('readonly', 'readonly');
addressInput.value = `lat: ${tokioLatLng.lat}, lng: ${tokioLatLng.lng}`;

const initMap = () => {
  const map = L.map('map-canvas')
    .on('load', () => {
      enableForm();
    })
    .setView({
      lat: tokioLatLng.lat,
      lng: tokioLatLng.lng,
    }, 12);

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
    addressInput.value = `lat: ${evt.target.getLatLng().lat}, lng:${evt.target.getLatLng().lng}`;
  });

  const pinIcon = L.icon({
    iconUrl: './img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const renderPins = (data) => {
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
  };

  loadData(renderPins);
};

export {initMap};
