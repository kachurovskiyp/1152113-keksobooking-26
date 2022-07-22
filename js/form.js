const form = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const formFieldsets = form.querySelectorAll('fieldset');
const mapFiltersSelects = mapFilters.querySelectorAll('select');
const mapFiltersFieldsets = mapFilters.querySelectorAll('fieldset');
const capacitySelect = form.querySelector('#capacity');

const disableForm = () => {
  form.classList.add('ad-form--disabled');
  formFieldsets.forEach((fieldset) => {
    fieldset.setAttribute('disabled', 'disabled');
  });

  mapFilters.classList.add('map__filters--disabled');
  mapFiltersSelects.forEach((select) => {
    select.setAttribute('disabled', 'disabled');
  });

  mapFiltersFieldsets.forEach((fieldset) => {
    fieldset.setAttribute('disabled', 'disabled');
  });
};

const enableForm = () => {
  form.classList.remove('ad-form--disabled');
  formFieldsets.forEach((fieldset) => {
    fieldset.disabled = false;
  });

  mapFilters.classList.remove('map__filters--disabled');
  mapFiltersSelects.forEach((select) => {
    select.disabled = false;
  });

  mapFiltersFieldsets.forEach((fieldset) => {
    fieldset.disabled = false;
  });
};

// Form validation

const adFormValidator = (pristine) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if(isValid) {
      form.submit();
    }
  });
};

const pristineConfig = {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'div',
  errorTextClass: 'text-help'
};

const onRoomChange = (value) => {
  switch(value) {
    case '1': {
      const pristine = new Pristine(form, pristineConfig);
      capacitySelect.querySelector('option[value="1"]').setAttribute('selected', 'selected');
      pristine.addValidator(capacitySelect, () => {
        return capacitySelect.value !== value ? false : true;
      }, '1 комната только для 1 гостя');
        break;
    }

    case '2': {
      const pristine = new Pristine(form, pristineConfig);
      capacitySelect.querySelector('option[value="2"]').setAttribute('selected', 'selected');
      pristine.addValidator(capacitySelect, () => {
        return capacitySelect.value > value || capacitySelect.value === '0' ? false : true;
      }, '2 комнаты только для 1 или 2 гостей');
      break;
    }

    case '3': {
      capacitySelect.querySelector('option[value="3"]').setAttribute('selected', 'selected');
      const pristine = new Pristine(form, pristineConfig);
      pristine.addValidator(capacitySelect, () => {
        return capacitySelect.value > value || capacitySelect.value === '0' ? false : true;
      }, '3 комнаты только для 1, 2 или 3 гостей');
      break;
    }

    case '100': {
      capacitySelect.querySelector('option[value="0"]').setAttribute('selected', 'selected');
      const pristine = new Pristine(form, pristineConfig);
      pristine.addValidator(capacitySelect, () => {
        return capacitySelect !== '0' ? false : true;
      }, '100 комнат не для гостей');
      break;
    }
  }
};

const onTypeChange = () => {
  const typeSelect = form.querySelector('#type');
  const priceInput = form.querySelector('#price');

  switch(typeSelect.value) {
    case 'bungalow': {
      priceInput.placeholder = '0';
      break;
     break;
    }

    case 'flat': {
      priceInput.placeholder = '1000';
      const pristine = new Pristine(form, pristineConfig);
      pristine.addValidator(priceInput, () => {
        return priceInput.value * 1 < 1000 ? false : true;
      }, 'Цена не может быть ниже 1000');
      break;
    }

    case 'hotel': {
      priceInput.placeholder = '3000';
      const pristine = new Pristine(form, pristineConfig);
      pristine.addValidator(priceInput, () => {
        return priceInput.value * 1 < 3000 ? false : true;
      }, 'Цена не может быть ниже 3000');
      break;
    }

    case 'house': {
      priceInput.placeholder = '5000';
      const pristine = new Pristine(form, pristineConfig);
      pristine.addValidator(priceInput, () => {
        return priceInput.value * 1 < 5000 ? false : true;
      }, 'Цена не может быть ниже 5000');
      break;
    }

    case 'palace': {
      priceInput.placeholder = '10000';
      const pristine = new Pristine(form, pristineConfig);
      pristine.addValidator(priceInput, () => {
        return priceInput.value * 1 < 10000 ? false : true;
      }, 'Цена не может быть ниже 10000');
      break;
    }
  }
};

const timeInSelect = form.querySelector('#timein');
const timeOutSelect = form.querySelector('#timeout');

const onInTimeChange = () => {
  timeOutSelect.value = timeInSelect.value;
}

const onOutTimeChange = () => {
  timeInSelect.value = timeOutSelect.value;
}

export {disableForm, enableForm, onRoomChange, onTypeChange, onInTimeChange, onOutTimeChange, adFormValidator};
