'use strict';

// Модуль, который работает с картой
(function () {

  // Размеры пина
  var PIN_WIDTH = 56;
  var PIN_HEIGHT = 75;

  // Минимальные и максимальные координаты главного пина
  var PIN_MAIN_MIN_X = 0;
  var PIN_MAIN_MAX_X = 1130;
  var PIN_MAIN_MIN_Y = 0;
  var PIN_MAIN_MAX_Y = 565;

  var pinsContainer = document.querySelector('.tokyo__pin-map');
  var pinsFragment = document.createDocumentFragment();
  var pinMain = pinsContainer.querySelector('.pin__main');
  var formAddress = document.querySelector('#address');

  // Создание пина для каждого объявления
  var fillPinsContainer = function () {
    for (var i = 0; i < window.data.length; i++) {
      var element = window.pin.createPin(window.data[i]);

      pinsFragment.appendChild(element);
    }

    pinsContainer.appendChild(pinsFragment);
  };

  var onOpenDialogClick = function (evt) {
    var currentPin = evt.target.closest('.pin:not(.pin__main)');

    if (currentPin) {
      window.card.showDialog(currentPin);
    }
  };

  var onOpenDialogKeyPress = function (evt) {
    var currentPin = evt.target.closest('.pin:not(.pin__main)');

    if (window.util.isKeyEnter(evt)) {
      window.card.showDialog(currentPin);
    }
  };

  var onPinMainMouseDown = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onPinMainMouseMove = function (moveEvt) {
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if (pinMain.offsetLeft - shift.x >= PIN_MAIN_MIN_X && pinMain.offsetLeft - shift.x <= PIN_MAIN_MAX_X && pinMain.offsetTop - shift.y >= PIN_MAIN_MIN_Y && pinMain.offsetTop - shift.y <= PIN_MAIN_MAX_Y) {
        pinMain.style.top = (pinMain.offsetTop - shift.y) + 'px';
        pinMain.style.left = (pinMain.offsetLeft - shift.x) + 'px';

        // Записываем в поле адреса координаты, на которые пин указывает острым концом
        formAddress.value = 'x: ' + (pinMain.offsetLeft - shift.x - PIN_WIDTH / 2) + ', y: ' + (pinMain.offsetTop - shift.y - PIN_HEIGHT);
      }
    };

    var onPinMainMouseUp = function () {
      document.removeEventListener('mousemove', onPinMainMouseMove);

      document.removeEventListener('mouseup', onPinMainMouseUp);
    };

    document.addEventListener('mousemove', onPinMainMouseMove);

    document.addEventListener('mouseup', onPinMainMouseUp);
  };

  // Заполняем карту пинами
  fillPinsContainer();

  pinsContainer.addEventListener('click', onOpenDialogClick);

  pinsContainer.addEventListener('keydown', onOpenDialogKeyPress);

  pinMain.addEventListener('mousedown', onPinMainMouseDown);
})();
