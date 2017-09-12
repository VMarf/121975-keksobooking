'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  // Возвращает случайное число из заданного диапазона, включая минимальное и максимальное значение, если убрать + 1, то возвращаемое число никогда не будет равняться максимальному значению
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

    newArray.forEach(function (_item, i) {
      var randomArrayIndex = getRandomArrayIndex(newArray);
      var randomArrayIndexValue = newArray[randomArrayIndex];

      newArray[randomArrayIndex] = newArray[i];
      newArray[i] = randomArrayIndexValue;
    });

    return newArray;
  };

  // Возвращает новый массив со случайным порядком элементов и случайной длины
  var getNewArrayRandomLength = function (array) {
    var shuffledArray = shuffleArray(array);

    shuffledArray.length = getValueFromRange(0, shuffledArray.length);

    return shuffledArray;
  };

  window.util = {
    isKeyEsc: function (evt) {
      return evt.keyCode === ESC_KEYCODE;
    },
    isKeyEnter: function (evt) {
      return evt.keyCode === ENTER_KEYCODE;
    },
    getValueFromRange: getValueFromRange,
    getRandomArrayIndex: getRandomArrayIndex,
    getRandomArrayValue: getRandomArrayValue,
    shuffleArray: shuffleArray,
    getNewArrayRandomLength: getNewArrayRandomLength
  };
})();
