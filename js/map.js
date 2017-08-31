'use strict';

// модуль, который работает с картой
(function () {

  // Константы для обработчиков событий
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var pinsContainer = document.querySelector('.tokyo__pin-map');
  var activePin;
  var dialogClose = document.querySelector('.dialog__close');

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

  var showDialog = function (pin) {
    activateCurrentPin(pin);
    window.card.replaceDialogPanel(window.data[activePin.id]);
    window.util.offerDialog.classList.remove('hidden');
    document.addEventListener('keydown', onCloseDialogEscPress);
  };

  var hideDialog = function () {
    deactivatePin();
    window.util.offerDialog.classList.add('hidden');
    document.removeEventListener('keydown', onCloseDialogEscPress);
  };

  // Функции для обработчиков событий
  var onOpenDialogClick = function (evt) {
    var currentPin = evt.target.closest('.pin:not(.pin__main)');

    showDialog(currentPin);
  };

  var onOpenDialogKeyPress = function (evt) {
    var currentPin = evt.target.closest('.pin:not(.pin__main)');

    if (evt.keyCode === ENTER_KEYCODE && currentPin) {
      showDialog(currentPin);
    }
  };

  var onCloseDialogClick = function () {
    hideDialog();
  };

  var onCloseDialogKeyPress = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      hideDialog();
    }
  };

  var onCloseDialogEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      hideDialog();
    }
  };

  pinsContainer.addEventListener('click', onOpenDialogClick);

  pinsContainer.addEventListener('keydown', onOpenDialogKeyPress);

  dialogClose.addEventListener('click', onCloseDialogClick);

  dialogClose.addEventListener('keydown', onCloseDialogKeyPress);
})();
