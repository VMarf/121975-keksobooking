'use strict';

// Сколько объявлений необходимо создать
var NUMBER_OF_ADS = 8;

var AD_AVATARS = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'];
var AD_TITLE = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var AD_TYPE = ['flat', 'house', 'bungalo'];
var AD_TYPE_MAP = {
  'flat': 'Квартира',
  'bungalo': 'Бунгало',
  'house': 'Дом'
};
var TIMES = ['12:00', '13:00', '14:00'];
var AD_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

// Массив для объявлений
var similarAds = [];

var dialogWindowTemplate = document.querySelector('#lodge-template').content;
var pinsContainer = document.querySelector('.tokyo__pin-map');
var pinsFragment = document.createDocumentFragment();
var offerDialog = document.querySelector('#offer-dialog');
var offerPanel = offerDialog.querySelector('.dialog__panel');
var adAuthorAvatar = offerDialog.querySelector('.dialog__title img');

// Возвращает случайное число из заданного диапазона
var getValueFromRange = function (minValue, maxValue) {
  var valueFromRange;

  valueFromRange = Math.floor(Math.random() * (maxValue - minValue + 1) + minValue);

  return valueFromRange;
};

// Возвращает случайный элемент из переданного массива
var getRandomArrayValue = function (array) {
  var randomArrayIndex = Math.floor(Math.random() * (array.length));

  return array[randomArrayIndex];
};

// Возвращает новый массив со случайным порядком элементов
var shuffleArray = function (array) {
  var newArray = array.slice();

  for (var i = newArray.length - 1; i > 0; i--) {
    var randomIndex = Math.floor(Math.random() * (i + 1));
    var randomIndexValue = newArray[randomIndex];

    if (randomIndex === i) {
      continue;
    }

    newArray[randomIndex] = newArray[i];
    newArray[i] = randomIndexValue;
  }

  return newArray;
};

// Возвращает новый массив случайной длины, созданный на основе переданного массива
var newArrayRandomLength = function (array) {
  var shuffledArray = shuffleArray(array);

  shuffledArray.length = getValueFromRange(0, shuffledArray.length);

  return shuffledArray;
};

// Создание элемента списка достоинств в объявлении
var createFeature = function (featuresArrayValue) {
  var feature = document.createElement('span');

  feature.classList.add('feature__image');
  feature.classList.add('feature__image--' + featuresArrayValue + '');

  return feature;
};

// Создание объявления
var createSimilarAd = function (adNumber) {
  var similarAd = {
    author: {
      avatar: adAvatarsShuffled[adNumber]
    },
    offer: {
      title: adTitleShuffled[adNumber],
      price: getValueFromRange(1000, 1000000),
      type: getRandomArrayValue(AD_TYPE),
      rooms: getValueFromRange(1, 5),
      guests: getValueFromRange(1, 3),
      checkin: getRandomArrayValue(TIMES),
      checkout: getRandomArrayValue(TIMES),
      features: newArrayRandomLength(AD_FEATURES),
      description: '',
      photos: []
    },
    location: {
      x: getValueFromRange(300, 900),
      y: getValueFromRange(100, 500)
    }
  };

  similarAd.offer.address = similarAd.location.x + ', ' + similarAd.location.y;

  return similarAd;
};

// Создание метки для карты
var createPin = function (adInfo) {
  var newPin = document.createElement('div');
  var newPinImage = document.createElement('img');

  newPin.appendChild(newPinImage);

  newPin.classList.add('pin');
  newPin.style.top = adInfo.location.y + 'px';
  newPin.style.left = adInfo.location.x + 'px';

  newPinImage.classList.add('rounded');
  newPinImage.setAttribute('src', adInfo.author.avatar);
  newPinImage.setAttribute('width', '40');
  newPinImage.setAttribute('height', '40');

  return newPin;
};

var createDialogWindow = function (adInfo) {
  var dialogWindow = dialogWindowTemplate.cloneNode(true);
  var adTitle = dialogWindow.querySelector('.lodge__title');
  var adAddress = dialogWindow.querySelector('.lodge__address');
  var adPrice = dialogWindow.querySelector('.lodge__price');
  var adType = dialogWindow.querySelector('.lodge__type');
  var adRoomsAndGuests = dialogWindow.querySelector('.lodge__rooms-and-guests');
  var adCheckInTime = dialogWindow.querySelector('.lodge__checkin-time');
  var adFeatures = dialogWindow.querySelector('.lodge__features');
  var adDescription = dialogWindow.querySelector('.lodge__description');

  adTitle.textContent = adInfo.offer.title;
  adAddress.textContent = adInfo.offer.address;
  adPrice.textContent = adInfo.offer.price + '&#x20bd;/ночь';
  adType.textContent = AD_TYPE_MAP[adInfo.offer.type];
  adRoomsAndGuests.textContent = 'Для ' + adInfo.offer.guests + ' гостей в ' + adInfo.offer.rooms + ' комнатах';
  adCheckInTime.textContent = 'Заезд после ' + adInfo.offer.checkin + ' , выезд до ' + adInfo.offer.checkout;
  adDescription.textContent = adInfo.offer.description;

  for (var i = 0; i < adInfo.offer.features.length; i++) {
    adFeatures.appendChild(createFeature(adInfo.offer.features[i]));
  }

  adAuthorAvatar.src = adInfo.author.avatar;

  return dialogWindow;
};

var replaceDialogWindow = function () {
  var currentAd = similarAds[0];

  offerDialog.replaceChild(createDialogWindow(currentAd), offerPanel);
};

var adAvatarsShuffled = shuffleArray(AD_AVATARS);
var adTitleShuffled = shuffleArray(AD_TITLE);

// Заполняем массив объявлений
for (var i = 0; i < NUMBER_OF_ADS; i++) {
  similarAds[i] = createSimilarAd(i);

  pinsFragment.appendChild(createPin(similarAds[i]));
}

pinsContainer.appendChild(pinsFragment);

replaceDialogWindow();
