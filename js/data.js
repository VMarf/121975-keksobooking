'use strict';

// модуль, который создает данные
(function () {

  // Сколько объявлений необходимо создать
  var NUMBER_OF_ADS = 8;

  var AD_AVATARS = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'];
  var AD_TITLE = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var AD_TYPE = ['flat', 'house', 'bungalo'];
  var TIMES = ['12:00', '13:00', '14:00'];
  var AD_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  // Массив для объявлений
  var similarAds = [];

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

  var adAvatarsShuffled = shuffleArray(AD_AVATARS);
  var adTitleShuffled = shuffleArray(AD_TITLE);

  // Заполняем массив объявлений
  for (var i = 0; i < NUMBER_OF_ADS; i++) {
    similarAds[i] = createSimilarAd(i);
  }

  window.data = similarAds;
})();
