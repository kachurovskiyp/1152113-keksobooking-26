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

// validation

const errorMessage = document.createElement('p');
errorMessage.classList.add('ad-form__error');
form.querySelector('.ad-form__element--submit').append(errorMessage);

const titleInput = form.querySelector('#title');

const pristine = new Pristine(form);

pristine.addValidator(
  titleInput,
  () => {
  console.log('add');
  return false;
});

form.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const isValid = pristine.validate();
  console.log(isValid);
});

export {disableForm, enableForm};
