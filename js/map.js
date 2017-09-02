'use strict';

// Модуль, который работает с картой
(function () {
  var pinsContainer = document.querySelector('.tokyo__pin-map');
  var pinsFragment = document.createDocumentFragment();

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

  // Заполняем карту пинами
  fillPinsContainer();

  pinsContainer.addEventListener('click', onOpenDialogClick);

  pinsContainer.addEventListener('keydown', onOpenDialogKeyPress);
})();
