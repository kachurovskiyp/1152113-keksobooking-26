const mapFilters = document.querySelector('.map__filters');
const typeSelect = mapFilters.querySelector('#housing-type');
const priceSelect = mapFilters.querySelector('#housing-price');
const roomSelect = mapFilters.querySelector('#housing-rooms');
const guestSelect = mapFilters.querySelector('#housing-guests');
const mapFiltersSelects = mapFilters.querySelectorAll('select');
const mapFiltersFieldsets = mapFilters.querySelectorAll('fieldset');
const features = mapFilters.querySelectorAll('input[type="checkbox"]');

const enableMapFilters = () => {
  mapFilters.classList.remove('map__filters--disabled');
  mapFiltersSelects.forEach((select) => {
    select.disabled = false;
  });

  mapFiltersFieldsets.forEach((fieldset) => {
    fieldset.disabled = false;
  });
};

const disableMapFilters = () => {
  mapFilters.classList.add('map__filters--disabled');
  mapFiltersSelects.forEach((select) => {
    select.setAttribute('disabled', 'disabled');
  });

  mapFiltersFieldsets.forEach((fieldset) => {
    fieldset.setAttribute('disabled', 'disabled');
  });
};

const resetMapFilters = () => {
  mapFiltersSelects.forEach((select) => {
    select.value = 'any';
  });

  features.forEach((feature) => {
    feature.checked = false;
  });
};

const setMapFilter = (cb) => {
  mapFilters.addEventListener('change', () => {
    cb();
  });
};

const filters = {
  type : (dataItem) => {
    if(typeSelect.value !== 'any') {
      return dataItem.offer.type === typeSelect.value;
    }
    return true;
  },

  price : (dataItem) => {
    if(priceSelect.value !== 'any') {
      switch(priceSelect.value) {
        case 'middle': {
          return dataItem.offer.price > 10000 && dataItem.offer.price < 50000;
        }
        case 'low': {
          return dataItem.offer.price < 100000;
        }
        case 'high': {
          return dataItem.offer.price > 500000;
        }
      }
    }
    return true;
  },

  rooms : (dataItem) => {
    if(roomSelect.value !== 'any') {
      return dataItem.offer.rooms === roomSelect.value * 1;
    }
    return true;
  },


  guest : (dataItem) => {
    if(guestSelect.value !== 'any') {
      return dataItem.offer.guests === guestSelect.value * 1;
    }
    return true;
  },

  features : (dataItem) => {
    if(dataItem.offer.features) {

      const checkedFilters = document.querySelector('.map__filters')
        .querySelectorAll('input[type="checkbox"]:checked');

      if(checkedFilters) {
        checkedFilters.forEach((filter) => dataItem.offer.features.includes(filter.id.substring(7)));
      }
    }
    return true;
  }
};

export {
  setMapFilter,
  disableMapFilters,
  enableMapFilters,
  resetMapFilters,
  filters
};
