const LAT = {min: 40, max: 60};
const LNG = {min: 10, max: 30};

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

const TITLES = [
  'Club Regency at Regency Towers',
  'Aurelia Antica Suites & Apartments',
  'Germanico Luxury Apartment',
  'Unique luxury apartment and rooms',
  'Residhome Toulouse Ponts Jumeaux'
];

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
];

const CHEKINS = [
  '12:00',
  '13:00',
  '14:00'
];

const DESCRIPTIONS = [
  'Residhome Toulouse Ponts Jumeaux is set in the Minimes - Barriere de Paris district of Toulouse, 3.6 km from Zénith de Toulouse and 3.7 km from Toulouse Expo.',
  'The accommodation comes with a flat-screen TV and a private bathroom with shower and a hairdryer, while the kitchen features a microwave, a fridge and a stovetop.',
  'The apartment is equipped with 1 bedroom, 1 bathroom, bed linen, towels, a flat-screen TV with satellite channels, a dining area, a fully equipped kitchen, and a terrace with garden views',
  'The apartment comes with 1 bedroom, 1 bathroom, bed linen, towels, a flat-screen TV with cable channels, a dining area, a fully equipped kitchen, and a terrace with garden views.',
  'Accommodation is fitted with air conditioning, a fully equipped kitchen with a dining area, a flat-screen TV and a private bathroom with shower, a hairdryer and free toiletries. '
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

function getRandomPositiveInteger (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function getRandomPositiveFloat (a, b, digits = 1) {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(digits);
}

function getRamdonArrayEL(array) {
  return array[getRandomPositiveInteger(1, array.length - 1)];
}

function shuffleArray(array) {
  let j, temp;

  for(let i = array.length - 1; i > 0; i--){
    j = Math.floor(Math.random()*(i + 1));
    temp = array[j];
    array[j] = array[i];
    array[i] = temp;
  }

  return array;
}

function getData (count) {
  const data = [];

  for(let step = 0; step < count; step++) {

    const ad = {
      author: {
        avatar: `img/avatars/user0${getRandomPositiveInteger(1, 10)}.png`
      },

      location: {
        lat: getRandomPositiveFloat(LAT.min, LAT.max, 6),
        lng: getRandomPositiveFloat(LNG.min, LNG.max, 6)
      },

      offer: {
        title: getRamdonArrayEL(TITLES),
        address: `${getRandomPositiveFloat(LAT.min, LAT.max, 6)}, ${getRandomPositiveFloat(LNG.min, LNG.max, 6)}`,
        price: getRandomPositiveInteger(100, 1000),
        type: getRamdonArrayEL(TYPES),
        rooms: getRandomPositiveInteger(1, 9),
        guests: getRandomPositiveInteger(1, 20),
        checkin: getRamdonArrayEL(CHEKINS),
        checkout: getRamdonArrayEL(CHEKINS),
        features: shuffleArray(FEATURES).slice(getRandomPositiveInteger(1, 6)),
        description: getRamdonArrayEL(DESCRIPTIONS),
        photos: shuffleArray(PHOTOS).slice(getRandomPositiveInteger(1, 3))
      }
    };

    data.push(ad);
  }

  return data;
}

getData(10);
