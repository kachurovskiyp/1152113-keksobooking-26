const form = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const formFieldsets = form.querySelectorAll('fieldset');
const mapFiltersSelects = mapFilters.querySelectorAll('select');
const mapFiltersFieldsets = mapFilters.querySelectorAll('fieldset');

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

const defaultConfig = {
  classTo: 'ad-form',
  errorClass: 'has-danger',
  successClass: 'has-success',
  errorTextParent: 'my-error',
  errorTextTag: 'p',
  errorTextClass: 'text-help'
};

const removeErrors = () => {
  const errors = form.querySelectorAll('.validation-error');
  if(errors) {
    errors.forEach((error) => {error.remove();});
  }
};

const pristine = new Pristine(form, defaultConfig);
const titleInput = form.querySelector('#title');
const priceInput = form.querySelector('#price');

pristine.addValidator(titleInput, () => {
  if(titleInput.value.length < 30) {
    return false;
  }
  return true;
}, 'Заголовок должен содержать минимум 30 знаков');

pristine.addValidator(priceInput, () => {
  if(priceInput.value * 1 > 100000) {
    return false;
  }
  return true;
}, 'Цена не может превыщать 100 000');

form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValide = pristine.validate();

  if(!isValide){
    removeErrors();
    pristine.getErrors().forEach((error) => {

      const errorMessage = document.createElement('span');
      errorMessage.classList.add('validation-error');
      errorMessage.textContent = error.errors;

      error.input.parentNode.append(errorMessage);
    });
  } else {
    removeErrors();
  }
});

const roomSelect = form.querySelector('#room_number');
const capacitySelect = form.querySelector('#capacity');

const onRoomChange = (value) => {
  capacitySelect.querySelectorAll('option').forEach((option) => {
    option.removeAttribute('disabled');
  });

  switch(value) {
    case '1': {
      capacitySelect.querySelector('option[value="1"]').setAttribute('selected', 'selected');
      capacitySelect.querySelectorAll('option').forEach((option) => {
        if(option.value !== 1){
          option.setAttribute('disabled', 'disabled');
        }
      });
      break;
    }

    case '2': {
      capacitySelect.querySelector('option[value="2"]').setAttribute('selected', 'selected');
      capacitySelect.querySelectorAll('option').forEach((option) => {
        if(option.value > value || option.value === 0){
          option.setAttribute('disabled', 'disabled');
        }
      });
      break;
    }

    case '3': {
      capacitySelect.querySelector('option[value="3"]').setAttribute('selected', 'selected');
      capacitySelect.querySelectorAll('option').forEach((option) => {
        if(option.value > value || option.value === 0) {
          option.setAttribute('disabled', 'disabled');
        }
      });
      break;
    }

    case '100': {
      capacitySelect.querySelector('option[value="0"]').setAttribute('selected', 'selected');
      capacitySelect.querySelectorAll('option').forEach((option) => {
        if(option.value !== 0){
          option.setAttribute('disabled', 'disabled');
        }
      });
      break;
    }
  }
};

roomSelect.addEventListener('change', () => {
  onRoomChange(roomSelect.value);
});

onRoomChange(roomSelect.value);

export {disableForm, enableForm};
