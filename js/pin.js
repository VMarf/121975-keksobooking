'use strict';

// Модуль для отрисовки пина
window.pin = (function () {

  // Размеры пина
  var PIN_WIDTH = 56;
  var PIN_HEIGHT = 75;

  var activePin;

  // Создание метки для карты, left и top задаются пину таким образом, чтобы острый конец указывал точно на полученные координаты
  var createPin = function (adInfo, adInfoIndex) {
    var newPin = document.createElement('div');
    var newPinImage = document.createElement('img');

    newPin.appendChild(newPinImage);

    newPin.classList.add('pin');
    newPin.id = adInfoIndex;
    newPin.style.left = adInfo.location.x - PIN_WIDTH / 2 + 'px';
    newPin.style.top = adInfo.location.y - PIN_HEIGHT + 'px';
    newPin.tabIndex = 0;

    newPinImage.classList.add('rounded');
    newPinImage.src = adInfo.author.avatar;
    newPinImage.width = 40;
    newPinImage.height = 40;

    return newPin;
  };

  var deactivatePin = function () {
    if (activePin) {
      activePin.classList.remove('pin--active');
    }
  };

  var activateCurrentPin = function (pin) {
    deactivatePin();
    pin.classList.add('pin--active');
    activePin = pin;
  };

  return {
    createPin: createPin,
    deactivatePin: deactivatePin,
    activateCurrentPin: activateCurrentPin
  };
})();
