import { getData } from './data.js';
import { renderCards } from './render.js';
import { disableForm, enableForm } from './form.js';

const data = getData(1);
renderCards(data);

disableForm();
enableForm();

