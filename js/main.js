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

function getMoks (count) {
  let moks = [];

  const features = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];

  const titles = [
    'Club Regency at Regency Towers',
    'Aurelia Antica Suites & Apartments',
    'Germanico Luxury Apartment',
    'Unique luxury apartment and rooms',
    'Residhome Toulouse Ponts Jumeaux'
  ];

  const types = [
    'palace',
    'flat',
    'house',
    'bungalow',
    'hotel'
  ];

  const checkins = [
    '12:00',
    '13:00',
    '14:00'
  ]

  descriptions = [
    'Residhome Toulouse Ponts Jumeaux is set in the Minimes - Barriere de Paris district of Toulouse, 3.6 km from Zénith de Toulouse and 3.7 km from Toulouse Expo.',
    'The accommodation comes with a flat-screen TV and a private bathroom with shower and a hairdryer, while the kitchen features a microwave, a fridge and a stovetop.',
    'The apartment is equipped with 1 bedroom, 1 bathroom, bed linen, towels, a flat-screen TV with satellite channels, a dining area, a fully equipped kitchen, and a terrace with garden views',
    'The apartment comes with 1 bedroom, 1 bathroom, bed linen, towels, a flat-screen TV with cable channels, a dining area, a fully equipped kitchen, and a terrace with garden views.',
    'Accommodation is fitted with air conditioning, a fully equipped kitchen with a dining area, a flat-screen TV and a private bathroom with shower, a hairdryer and free toiletries. '
  ];

  photos = [
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
  ];

  for(step = 0; step < count; step++) {

    let ad = {
      author: {
        avatar: 'img/avatars/user0' + getRandomPositiveInteger(1, 10) + '.png'
      },

      location: {
        lat: getRandomPositiveFloat(40, 60, 6),
        lng: getRandomPositiveFloat(10, 30, 6)
      },

      offer: {
        title: titles[getRandomPositiveInteger(1, 5)],
        address: getRandomPositiveFloat(40, 60, 6) + ', ' + getRandomPositiveFloat(10, 30, 6),
        price: getRandomPositiveInteger(100, 1000),
        type: types[getRandomPositiveInteger(1, 5)],
        rooms: getRandomPositiveInteger(1, 9),
        guests: getRandomPositiveInteger(1, 20),
        checkin: checkins[getRandomPositiveInteger(1, 3)],
        checkout: checkins[getRandomPositiveInteger(1, 3)],
        features: features.slice(getRandomPositiveInteger(1, 6)),
        description: descriptions[getRandomPositiveInteger(1, 5)],
        photos: photos.slice(getRandomPositiveInteger(1, 3))
      }
    };

    moks.push(ad);
  }

  return moks;
}

getMoks(10);
