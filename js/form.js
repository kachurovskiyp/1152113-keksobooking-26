import { sendData } from './api.js';
import { disableMapFilters, enableMapFilters, resetMapFilters } from './map-filers.js';
import { resetMap, getDafaultCoords } from './map.js';

const form = document.querySelector('.ad-form');
const formFieldsets = form.querySelectorAll('fieldset');
const capacitySelect = form.querySelector('#capacity');
const timeInSelect = form.querySelector('#timein');
const timeOutSelect = form.querySelector('#timeout');
const slider = form.querySelector('.ad-form__slider');
const typeSelect = form.querySelector('#type');
const priceInput = form.querySelector('#price');
const resetButton = form.querySelector('.ad-form__reset');
const addressInput = form.querySelector('#address');

const pristineConfig = {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'div',
  errorTextClass: 'text-help'
};

// Price slider

noUiSlider.create(slider, {
  range: {
    min: 0,
    max: 100000,
  },
  step: 10,
  start: 0,
  connect: 'lower'
});

slider.noUiSlider.on('update', () => {
  priceInput.value = slider.noUiSlider.get();
});

const disableForm = () => {
  form.classList.add('ad-form--disabled');
  formFieldsets.forEach((fieldset) => {
    fieldset.setAttribute('disabled', 'disabled');
  });
  disableMapFilters();
};

const enableForm = () => {
  form.classList.remove('ad-form--disabled');
  formFieldsets.forEach((fieldset) => {
    fieldset.disabled = false;
  });
  enableMapFilters();
};

const resetForm = () => {
  form.reset();
  resetMapFilters();
  resetMap();
  addressInput.value = getDafaultCoords();
};

// Form validation
const adFormValidator = (pristine) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if(isValid) {
      sendData(new FormData(evt.target));
    }
  });
};

const onRoomChange = (value) => {
  switch(value) {
    case '1': {
      const pristine = new Pristine(form, pristineConfig);
      capacitySelect.querySelector('option[value="1"]').setAttribute('selected', 'selected');
      pristine.addValidator(capacitySelect, () => capacitySelect.value === value,'1 комната только для 1 гостя');
      break;
    }

    case '2': {
      const pristine = new Pristine(form, pristineConfig);
      capacitySelect.querySelector('option[value="2"]').setAttribute('selected', 'selected');
      pristine.addValidator(capacitySelect, () => capacitySelect.value < value && capacitySelect.value !== '0', '2 комнаты только для 1 или 2 гостей');
      break;
    }

    case '3': {
      capacitySelect.querySelector('option[value="3"]').setAttribute('selected', 'selected');
      const pristine = new Pristine(form, pristineConfig);
      pristine.addValidator(capacitySelect, () => capacitySelect.value <= value && capacitySelect.value !== '0', '3 комнаты только для 1, 2 или 3 гостей');
      break;
    }

    case '100': {
      capacitySelect.querySelector('option[value="0"]').setAttribute('selected', 'selected');
      const pristine = new Pristine(form, pristineConfig);
      pristine.addValidator(capacitySelect, () => capacitySelect.value === '0', '100 комнат не для гостей');
      break;
    }
  }
};

const onTypeChange = () => {
  switch(typeSelect.value) {
    case 'bungalow': {
      priceInput.placeholder = '0';
      slider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100000,
        },
        step: 10,
      });
      priceInput.value = 0;
      break;
    }

    case 'flat': {
      priceInput.placeholder = '1000';
      slider.noUiSlider.updateOptions({
        range: {
          min: 1000,
          max: 100000,
        },
        step: 10,
      });
      priceInput.value = 1000;
      const pristine = new Pristine(form, pristineConfig);
      pristine.addValidator(priceInput, () => priceInput.value * 1 > 1000, 'Цена не может быть ниже 1000');
      break;
    }

    case 'hotel': {
      priceInput.placeholder = '3000';
      slider.noUiSlider.updateOptions({
        range: {
          min: 3000,
          max: 100000,
        },
        step: 10,
      });
      priceInput.value = 3000;
      const pristine = new Pristine(form, pristineConfig);
      pristine.addValidator(priceInput, () => priceInput.value * 1 > 3000, 'Цена не может быть ниже 3000');
      break;
    }

    case 'house': {
      priceInput.placeholder = '5000';
      slider.noUiSlider.updateOptions({
        range: {
          min: 5000,
          max: 100000,
        },
        step: 10,
      });
      priceInput.value = 5000;
      const pristine = new Pristine(form, pristineConfig);
      pristine.addValidator(priceInput, () => priceInput.value * 1 > 5000, 'Цена не может быть ниже 5000');
      break;
    }

    case 'palace': {
      priceInput.placeholder = '10000';
      slider.noUiSlider.updateOptions({
        range: {
          min: 10000,
          max: 100000,
        },
        step: 10,
      });
      priceInput.value = 10000;
      const pristine = new Pristine(form, pristineConfig);
      pristine.addValidator(priceInput, () => priceInput.value * 1 > 10000, 'Цена не может быть ниже 10000');
      break;
    }
  }
};

const onInTimeChange = () => {
  timeOutSelect.value = timeInSelect.value;
};

const onOutTimeChange = () => {
  timeInSelect.value = timeOutSelect.value;
};

addressInput.setAttribute('readonly', 'readonly');
addressInput.value = getDafaultCoords();

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm();
});

export {
  disableForm,
  enableForm,
  onRoomChange,
  onTypeChange,
  onInTimeChange,
  onOutTimeChange,
  adFormValidator
};
