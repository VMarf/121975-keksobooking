'use strict';

// Сколько объявлений необходимо создать
var NUMBER_OF_ADS = 8;

var AD_TITLE = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var AD_TYPE = ['flat', 'house', 'bungalo'];
var TIMES = ['12:00', '13:00', '14:00'];
var AD_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

// Массив для объявлений
var similarAds = [];

// Возвращает случайное число из заданного диапазона
var getValueFromRange = function (minValue, maxValue) {
  var valueFromRange;

  valueFromRange = Math.round(minValue - 0.5 + Math.random() * (maxValue - minValue + 1));

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

    newArray[randomIndex] = newArray[i];
    newArray[i] = randomIndexValue;
  }

  return newArray;
};

// Возвращает новый массив случайной длины, созданный на основе переданного массива
var newArrayRandomLength = function (array) {
  var newArray = array.slice();

  for (var i = newArray.length - 1; i > 0; i--) {
    var randomIndex = Math.floor(Math.random() * (i + 1));
    var randomIndexValue = newArray[randomIndex];

    newArray[randomIndex] = newArray[i];
    newArray[i] = randomIndexValue;
  }

  newArray.length = getValueFromRange(0, newArray.length);

  return newArray;
};

// Получение аватара автора объявления
var getAuthorAvatar = function (number) {
  var authorAvatar;

  if (number < 10) {
    authorAvatar = 'img/avatars/user0' + number + '.png';
  } else {
    authorAvatar = 'img/avatars/user' + number + '.png';
  }

  return authorAvatar;
};

// Создание объявления
var createSimilarAd = function (AdNumber) {
  var similarAd = {
    author: {
      avatar: getAuthorAvatar(AdNumber + 1)
    },
    offer: {
      title: adTitleShuffled[AdNumber],
      price: getValueFromRange(1000, 1000000),
      type: getRandomArrayValue(AD_TYPE),
      rooms: getValueFromRange(1, 5),
      guests: getValueFromRange(0, 7),
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

  similarAd.address = similarAd.location.x + ', ' + similarAd.location.y;

  return similarAd;
};

var adTitleShuffled = shuffleArray(AD_TITLE);

// Заполняем массив объявлений
for (var i = 0; i < NUMBER_OF_ADS; i++) {
  similarAds[i] = createSimilarAd(i);
}
