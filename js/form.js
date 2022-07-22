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

const getPristineConfig = () => {
  return pristineConfig = {
    classTo: 'ad-form__element',
    errorTextParent: 'ad-form__element',
    errorTextTag: 'div',
    errorTextClass: 'text-help'
  };
}

const adFormValidator = (pristine) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if(isValid) {
      form.submit();
    }
 });
}


const onRoomChange = (value) => {
  capacitySelect.querySelectorAll('option').forEach((option) => {
    option.removeAttribute('disabled');
  });

  switch(value) {
    case '1': {
      capacitySelect.querySelector('option[value="1"]').setAttribute('selected', 'selected');
      capacitySelect.querySelectorAll('option').forEach((option) => {
        if(option.value !== value){
          option.setAttribute('disabled', 'disabled');
        }
      });
      break;
    }

    case '2': {
      capacitySelect.querySelector('option[value="2"]').setAttribute('selected', 'selected');
      capacitySelect.querySelectorAll('option').forEach((option) => {
        if(option.value > value || option.value === '0'){
          option.setAttribute('disabled', 'disabled');
        }
      });
      break;
    }

    case '3': {
      capacitySelect.querySelector('option[value="3"]').setAttribute('selected', 'selected');
      capacitySelect.querySelectorAll('option').forEach((option) => {
        if(option.value > value || option.value === '0') {
          option.setAttribute('disabled', 'disabled');
        }
      });
      break;
    }

    case '100': {
      capacitySelect.querySelector('option[value="0"]').setAttribute('selected', 'selected');
      capacitySelect.querySelectorAll('option').forEach((option) => {
        if(option.value !== '0'){
          option.setAttribute('disabled', 'disabled');
        }
      });
      break;
    }
  }
};

export {disableForm, enableForm, onRoomChange, getPristineConfig, adFormValidator};
