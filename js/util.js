'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  window.util = {
    ESC_KEYCODE: ESC_KEYCODE,
    ENTER_KEYCODE: ENTER_KEYCODE,

    // Возвращает случайное число из заданного диапазона, включая минимальное и максимальное значение, если убрать + 1, то возвращаемое число никогда не будет равняться максимальному значению
    getValueFromRange: function (minValue, maxValue) {
      return Math.floor(Math.random() * (maxValue - minValue + 1) + minValue);
    },

    // Возвращает случайный индекс из массива
    getRandomArrayIndex: function (array) {
      return Math.floor(Math.random() * array.length);
    },

    // Возвращает случайный элемент из массива
    getRandomArrayValue: function (array) {
      var randomArrayIndex = window.util.getRandomArrayIndex(array);

      return array[randomArrayIndex];
    },

    // Возвращает новый массив со случайным порядком элементов
    shuffleArray: function (array) {
      var newArray = array.slice();

      for (var i = newArray.length - 1; i > 0; i--) {
        var randomArrayIndex = window.util.getRandomArrayIndex(newArray);
        var randomArrayIndexValue = newArray[randomArrayIndex];

        if (randomArrayIndex === i) {
          continue;
        }

        newArray[randomArrayIndex] = newArray[i];
        newArray[i] = randomArrayIndexValue;
      }

      return newArray;
    },

    // Возвращает новый массив со случайным порядком элементов и случайной длины
    getNewArrayRandomLength: function (array) {
      var shuffledArray = window.util.shuffleArray(array);

      shuffledArray.length = window.util.getValueFromRange(0, shuffledArray.length);

      return shuffledArray;
    }
  };
})();
