'use strict';

// Модуль, который создает данные
(function () {

  // Сколько объявлений необходимо создать
  var NUMBER_OF_ADS = 8;

  // Исходные данные
  var AD_AVATARS = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'];
  var AD_TITLE = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var AD_TYPE = ['flat', 'house', 'bungalo'];
  var TIMES = ['12:00', '13:00', '14:00'];
  var AD_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  // Массив для объявлений
  var similarAds = [];

  // Создание объявления
  var createSimilarAd = function (adNumber) {
    var similarAd = {
      author: {
        avatar: adAvatarsShuffled[adNumber]
      },
      offer: {
        title: adTitleShuffled[adNumber],
        price: window.util.getValueFromRange(1000, 1000000),
        type: window.util.getRandomArrayValue(AD_TYPE),
        rooms: window.util.getValueFromRange(1, 5),
        guests: window.util.getValueFromRange(1, 3),
        checkin: window.util.getRandomArrayValue(TIMES),
        checkout: window.util.getRandomArrayValue(TIMES),
        features: window.util.getNewArrayRandomLength(AD_FEATURES),
        description: '',
        photos: []
      },
      location: {
        x: window.util.getValueFromRange(300, 900),
        y: window.util.getValueFromRange(100, 500)
      }
    };

    similarAd.offer.address = similarAd.location.x + ', ' + similarAd.location.y;

    return similarAd;
  };

  var adAvatarsShuffled = window.util.shuffleArray(AD_AVATARS);
  var adTitleShuffled = window.util.shuffleArray(AD_TITLE);

  // Заполняем массив объявлений
  for (var i = 0; i < NUMBER_OF_ADS; i++) {
    similarAds[i] = createSimilarAd(i);
  }

  // Отправляем готовые объявления в глобальную область видимости
  window.data = similarAds;
})();
