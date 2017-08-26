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

// Размеры пина на карте
var PIN_WIDTH = 56;
var PIN_HEIGHT = 75;

// Массив для объявлений
var similarAds = [];

var pinsContainer = document.querySelector('.tokyo__pin-map');
var pinsFragment = document.createDocumentFragment();
var offerDialog = document.querySelector('#offer-dialog');
var dialogAvatar = offerDialog.querySelector('.dialog__title img');
var oldDialogPanel = offerDialog.querySelector('.dialog__panel');
var dialogPanelTemplate = document.querySelector('#lodge-template').content;

// Возвращает случайное число из заданного диапазона, включая минимальное и максимальное значение
// Если убрать + 1, то возвращаемое число никогда не будет равняться максимальному значению
var getValueFromRange = function (minValue, maxValue) {
  return Math.floor(Math.random() * (maxValue - minValue + 1) + minValue);
};

// Возвращает случайный индекс из массива
var getRandomArrayIndex = function (array) {
  return Math.floor(Math.random() * array.length);
};

// Возвращает случайный элемент из массива
var getRandomArrayValue = function (array) {
  var randomArrayIndex = getRandomArrayIndex(array);

  return array[randomArrayIndex];
};

// Возвращает новый массив со случайным порядком элементов
var shuffleArray = function (array) {
  var newArray = array.slice();

  for (var i = newArray.length - 1; i > 0; i--) {
    var randomArrayIndex = getRandomArrayIndex(newArray);
    var randomArrayIndexValue = newArray[randomArrayIndex];

    if (randomArrayIndex === i) {
      continue;
    }

    newArray[randomArrayIndex] = newArray[i];
    newArray[i] = randomArrayIndexValue;
  }

  return newArray;
};

// Возвращает новый массив со случайным порядком элементов и случайной длины
var getNewArrayRandomLength = function (array) {
  var shuffledArray = shuffleArray(array);

  shuffledArray.length = getValueFromRange(0, shuffledArray.length);

  return shuffledArray;
};

// Создание элемента списка достоинств в объявлении
var createFeature = function (featuresArrayValue) {
  var feature = document.createElement('span');

  feature.classList.add('feature__image');
  feature.classList.add('feature__image--' + featuresArrayValue);

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
      features: getNewArrayRandomLength(AD_FEATURES),
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
// left и top задаются пину таким образом, чтобы острый конец пина указывал точно на полученные координаты
var createPin = function (adInfo) {
  var newPin = document.createElement('div');
  var newPinImage = document.createElement('img');

  newPin.appendChild(newPinImage);

  newPin.classList.add('pin');
  newPin.style.left = adInfo.location.x - PIN_WIDTH / 2 + 'px';
  newPin.style.top = adInfo.location.y - PIN_HEIGHT + 'px';

  newPinImage.classList.add('rounded');
  newPinImage.src = adInfo.author.avatar;
  newPinImage.width = 40;
  newPinImage.height = 40;

  return newPin;
};

var createNewDialogPanel = function (adInfo) {
  var newDialogPanel = dialogPanelTemplate.cloneNode(true);
  var adTitle = newDialogPanel.querySelector('.lodge__title');
  var adAddress = newDialogPanel.querySelector('.lodge__address');
  var adPrice = newDialogPanel.querySelector('.lodge__price');
  var adType = newDialogPanel.querySelector('.lodge__type');
  var adRoomsAndGuests = newDialogPanel.querySelector('.lodge__rooms-and-guests');
  var adCheckInTime = newDialogPanel.querySelector('.lodge__checkin-time');
  var adFeatures = newDialogPanel.querySelector('.lodge__features');
  var adDescription = newDialogPanel.querySelector('.lodge__description');

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

  dialogAvatar.src = adInfo.author.avatar;

  return newDialogPanel;
};

var replaceDialogPanel = function (currentAd) {
  offerDialog.replaceChild(createNewDialogPanel(currentAd), oldDialogPanel);
};

// Функции для обработчиков событий
var onPinsContainerClick = function (evt) {
  var pin = evt.target.closest('.pin:not(.pin__main)');

  pin.classList.add('pin--active');
};

var adAvatarsShuffled = shuffleArray(AD_AVATARS);
var adTitleShuffled = shuffleArray(AD_TITLE);

// Заполняем массив объявлений
for (var i = 0; i < NUMBER_OF_ADS; i++) {
  similarAds[i] = createSimilarAd(i);

  pinsFragment.appendChild(createPin(similarAds[i]));
}

pinsContainer.appendChild(pinsFragment);

replaceDialogPanel(similarAds[0]);

pinsContainer.addEventListener('click', onPinsContainerClick);
