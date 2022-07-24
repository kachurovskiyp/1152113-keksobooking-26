const cardTemplate = document.querySelector('#card');

const renderCard = (card) => {
  const cardElement = cardTemplate.cloneNode(true);
  const features = cardElement.content.querySelectorAll('.popup__feature');

  const photosContainer = cardElement.content.querySelector('.popup__photos');
  photosContainer.innerHTML='';

  const avatar = cardElement.content.querySelector('.popup__avatar');
  avatar.src = card.author.avatar;


  cardElement.content.querySelector('.popup__title').textContent = card.offer.title;
  cardElement.content.querySelector('.popup__text--address').textContent = card.offer.address;
  cardElement.content.querySelector('.popup__text--price').innerHTML = `${card.offer.price} <span>₽/ночь</span>`;
  cardElement.content.querySelector('.popup__text--capacity').textContent = `${card.offer.rooms} комнаты для ${card.offer.guests} гостей`;
  cardElement.content.querySelector('.popup__text--time').textContent = `Заезд после ${card.offer.checkin}, выезд до ${card.offer.checkout}`;
  cardElement.content.querySelector('.popup__description').textContent = card.offer.description;

  switch(card.offer.type) {
    case 'palace':
      cardElement.content.querySelector('.popup__type').textContent = 'Дворец';
      break;

    case 'flat':
      cardElement.content.querySelector('.popup__type').textContent = 'Квартира';
      break;

    case 'house':
      cardElement.content.querySelector('.popup__type').textContent = 'Дом';
      break;

    case 'bungalow':
      cardElement.content.querySelector('.popup__type').textContent = 'Бунгало';
      break;

    case 'hotel':
      cardElement.content.querySelector('.popup__type').textContent = 'Отель';
      break;
  }

  features.forEach((featuresItem) => {
    const isNecessary = card.offer.features.some(
      (cardFeature) => featuresItem.classList.contains(`popup__feature--${cardFeature}`)
    );

    if(!isNecessary) {
      featuresItem.remove();
    }
  });

  card.offer.photos.forEach((photo) => {
    const image = document.createElement('img');

    image.src = photo;
    image.classList.add('popup__photo');
    image.width = '45';
    image.height = '40';
    image.alt = 'Фотография жилья';

    photosContainer.appendChild(image);
  });

  return cardElement.content;
};

export {renderCard};
