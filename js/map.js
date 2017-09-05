'use strict';

// Модуль, который работает с картой
(function () {

  // Размеры пина
  var PIN_WIDTH = 56;
  var PIN_HEIGHT = 75;

  // Минимальные и максимальные координаты главного пина
  var PIN_MAIN_MIN_X = 260;
  var PIN_MAIN_MAX_X = 1090;
  var PIN_MAIN_MIN_Y = 75;
  var PIN_MAIN_MAX_Y = 560;

  var pinsContainer = document.querySelector('.tokyo__pin-map');
  var pinsFragment = document.createDocumentFragment();
  var pinMain = pinsContainer.querySelector('.pin__main');
  var formAddress = document.querySelector('#address');

  var pinMainTop;
  var pinMainLeft;

  // Создание пина для каждого объявления
  var fillPinsContainer = function (data) {
    var similarAds = data;

    for (var i = 0; i < data.length; i++) {
      var element = window.pin.createPin(data[i], i);

      pinsFragment.appendChild(element);
    }

    pinsContainer.appendChild(pinsFragment);

    window.similarAds = similarAds;
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

      pinMainTop = pinMain.offsetTop - shift.y;
      pinMainLeft = pinMain.offsetLeft - shift.x;

      if (pinMainLeft >= PIN_MAIN_MIN_X && pinMainLeft <= PIN_MAIN_MAX_X && pinMainTop >= PIN_MAIN_MIN_Y && pinMainTop <= PIN_MAIN_MAX_Y) {
        pinMain.style.top = pinMainTop + 'px';
        pinMain.style.left = pinMainLeft + 'px';
        pinMain.style.zIndex = 10;

        // Записываем в поле адреса координаты, на которые пин указывает острым концом
        formAddress.value = 'x: ' + (pinMainLeft - PIN_WIDTH / 2) + ', y: ' + (pinMainTop - PIN_HEIGHT);
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
  window.backend.load(fillPinsContainer, window.backend.requestError);

  pinsContainer.addEventListener('click', onOpenDialogClick);

  pinsContainer.addEventListener('keydown', onOpenDialogKeyPress);

  pinMain.addEventListener('mousedown', onPinMainMouseDown);
})();
