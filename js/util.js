'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  // Возвращает случайный индекс из массива
  var getRandomArrayIndex = function (array) {
    return Math.floor(Math.random() * array.length);
  };

  // Возвращает новый массив со случайным порядком элементов
  var shuffleArray = function (array) {
    var newArray = array.slice();

    newArray.forEach(function (_item, i) {
      var randomArrayIndex = getRandomArrayIndex(newArray);
      var randomArrayIndexValue = newArray[randomArrayIndex];

      newArray[randomArrayIndex] = newArray[i];
      newArray[i] = randomArrayIndexValue;
    });

    return newArray;
  };

  window.util = {
    isKeyEsc: function (evt) {
      return evt.keyCode === ESC_KEYCODE;
    },
    isKeyEnter: function (evt) {
      return evt.keyCode === ENTER_KEYCODE;
    },
    shuffleArray: shuffleArray
  };
})();
