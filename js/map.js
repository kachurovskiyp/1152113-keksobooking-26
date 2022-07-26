import { renderCard } from './render.js';
import { enableForm } from './form.js';
import { loadData } from './api.js';
import { setMapFilter, filters } from './map-filers.js';
import { debounce } from './until.js';

const defaultCoords = {
  LAT: 35.701147508168674,
  LNG: 139.7822078445013
};
const MAX_PINS_COUNT = 10;
const RENDER_DELAY = 500;

const getDafaultCoords = () => `lat: ${defaultCoords.LAT}, lng: ${defaultCoords.LNG}`;

const addressInput = document.querySelector('#address');
const map = L.map('map-canvas');
const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});
const mainMarker = L.marker(
  {
    lat: defaultCoords.LAT,
    lng: defaultCoords.LNG
  },
  {
    draggable: true,
    icon: mainPinIcon
  },
);

const pinsGroup = L.layerGroup().addTo(map);

const pinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const renderPins = (data) => {
  pinsGroup.clearLayers();
  data
    .slice()
    .filter(filters.type)
    .filter(filters.price)
    .filter(filters.rooms)
    .filter(filters.guest)
    .filter(filters.features)
    .slice(0, MAX_PINS_COUNT).forEach((dataItem) => {
      const marker = L.marker(
        {
          lat: dataItem.location.lat,
          lng: dataItem.location.lng,
        },
        {
          icon: pinIcon
        },
      );
      marker.addTo(pinsGroup).bindPopup(renderCard(dataItem));
    });
};

const mapInit = () => {
  map
    .on('load', () => {
      enableForm();
    })
    .setView({
      lat: defaultCoords.LAT,
      lng: defaultCoords.LNG,
    }, 12);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  mainMarker.addTo(map);

  mainMarker.on('moveend', (evt) => {
    addressInput.value = `lat: ${evt.target.getLatLng().lat}, lng:${evt.target.getLatLng().lng}`;
  });

  loadData((data) => {
    renderPins(data);
    setMapFilter(debounce(
        () => renderPins(data),
        RENDER_DELAY
      )
    );
  });
};

const resetMap = () => {
  map.setView({
    lat: defaultCoords.LAT,
    lng: defaultCoords.LNG,
  }, 12);

  map.closePopup();

  mainMarker.setLatLng({
    lat: defaultCoords.LAT,
    lng: defaultCoords.LNG
  });
};

export {mapInit, resetMap, getDafaultCoords};
