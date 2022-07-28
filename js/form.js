import { sendData } from './api.js';
import { disableMapFilters, enableMapFilters, resetMapFilters } from './map-filers.js';
import { resetMap, getDafaultCoords } from './map.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const FORM_FOTO_WIDTH = 200;
const sliderRange = {
  MIN: 0,
  MAX: 100000,
  START: 0,
  STEP: 10
};

const minPrices = {
  bungalow: 0,
  flat : 1000,
  hotel : 3000,
  house : 5000,
  palace : 10000
};

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
const submitButton = form.querySelector('.ad-form__submit');

const fotoCooser = form.querySelector('#images');
const fotoPrewiev = form.querySelector('.ad-form__photo');

const avatarCooser = form.querySelector('#avatar');
const avatarPrewiev = form.querySelector('.ad-form-header__preview');

const disableForm = () => {
  form.classList.add('ad-form--disabled');
  formFieldsets.forEach((fieldset) => {
    fieldset.setAttribute('disabled', 'disabled');
  });
  disableMapFilters();
};

disableForm();

const enableForm = () => {
  form.classList.remove('ad-form--disabled');
  formFieldsets.forEach((fieldset) => {
    fieldset.disabled = false;
  });
  enableMapFilters();
};

const pristineConfig = {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'div',
  errorTextClass: 'text-help'
};

// avatar

avatarCooser.addEventListener('change', () => {
  const file = avatarCooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    avatarPrewiev.querySelector('img').src = URL.createObjectURL(file);
  }
});

//form foto

fotoCooser.addEventListener('change', () => {
  const file = fotoCooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const foto = document.createElement('img');
    foto.src = URL.createObjectURL(file);
    foto.width = FORM_FOTO_WIDTH;
    foto.alt = 'Фото жилья';
    fotoPrewiev.append(foto);
  }
});

// Price slider

noUiSlider.create(slider, {
  range: {
    min: sliderRange.MIN,
    max: sliderRange.MAX,
  },
  step: sliderRange.STEP,
  start: sliderRange.START,
  connect: 'lower'
});

slider.noUiSlider.on('update', () => {
  priceInput.value = slider.noUiSlider.get();
});

const resetForm = () => {
  form.reset();
  resetMapFilters();
  resetMap();
  addressInput.value = getDafaultCoords();
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикуем...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

// Form validation
const adFormValidator = (pristine) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if(isValid) {
      blockSubmitButton();
      sendData(new FormData(evt.target));
      resetForm();
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
      priceInput.placeholder = minPrices.bungalow;
      slider.noUiSlider.updateOptions({
        range: {
          min: sliderRange.MIN,
          max: sliderRange.MAX,
        },
        step: sliderRange.STEP,
      });
      priceInput.value = minPrices.bungalow;
      break;
    }

    case 'flat': {
      priceInput.placeholder = minPrices.flat;
      slider.noUiSlider.updateOptions({
        range: {
          min: minPrices.flat,
          max: sliderRange.MAX,
        },
        step: sliderRange.STEP,
      });
      priceInput.value = minPrices.flat;
      const pristine = new Pristine(form, pristineConfig);
      pristine.addValidator(priceInput, () => priceInput.value * 1 > minPrices.flat, `Цена не может быть ниже ${minPrices.flat}`);
      break;
    }

    case 'hotel': {
      priceInput.placeholder = minPrices.hotel;
      slider.noUiSlider.updateOptions({
        range: {
          min: minPrices.hotel,
          max: sliderRange.MAX,
        },
        step: sliderRange.STEP,
      });
      priceInput.value = minPrices.hotel;
      const pristine = new Pristine(form, pristineConfig);
      pristine.addValidator(priceInput, () => priceInput.value * 1 > minPrices.hotel, `Цена не может быть ниже ${minPrices.hotel}`);
      break;
    }

    case 'house': {
      priceInput.placeholder = minPrices.house;
      slider.noUiSlider.updateOptions({
        range: {
          min: minPrices.house,
          max: sliderRange.MAX,
        },
        step: sliderRange.STEP,
      });
      priceInput.value = minPrices.house;
      const pristine = new Pristine(form, pristineConfig);
      pristine.addValidator(priceInput, () => priceInput.value * 1 > minPrices.house, `Цена не может быть ниже ${minPrices.house}`);
      break;
    }

    case 'palace': {
      priceInput.placeholder = minPrices.palace;
      slider.noUiSlider.updateOptions({
        range: {
          min: minPrices.palace,
          max: sliderRange.MAX,
        },
        step: sliderRange.STEP,
      });
      priceInput.value = minPrices.palace;
      const pristine = new Pristine(form, pristineConfig);
      pristine.addValidator(priceInput, () => priceInput.value * 1 > minPrices.palace, `Цена не может быть ниже ${minPrices.palace}`);
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
  adFormValidator,
  unblockSubmitButton
};
