'use strict';

// Модуль, который работает с картой, использует модули pin и card
(function () {
  var deactivatePin = function () {
    if (window.pin.activePin) {
      window.pin.activePin.classList.remove('pin--active');
    }
  };

  var activateCurrentPin = function (pin) {
    deactivatePin();
    pin.classList.add('pin--active');
    window.pin.activePin = pin;
  };

  var showDialog = function (pin) {
    activateCurrentPin(pin);
    window.card.replaceDialogPanel(window.data[window.pin.activePin.id]);
    window.card.offerDialog.classList.remove('hidden');
    document.addEventListener('keydown', onCloseDialogEscPress);
  };

  var hideDialog = function () {
    deactivatePin();
    window.card.offerDialog.classList.add('hidden');
    document.removeEventListener('keydown', onCloseDialogEscPress);
  };

  // Функции для обработчиков событий
  var onOpenDialogClick = function (evt) {
    var currentPin = evt.target.closest('.pin:not(.pin__main)');

    showDialog(currentPin);
  };

  var onOpenDialogKeyPress = function (evt) {
    var currentPin = evt.target.closest('.pin:not(.pin__main)');

    if (evt.keyCode === window.util.ENTER_KEYCODE && currentPin) {
      showDialog(currentPin);
    }
  };

  var onCloseDialogClick = function () {
    hideDialog();
  };

  var onCloseDialogKeyPress = function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      hideDialog();
    }
  };

  var onCloseDialogEscPress = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      hideDialog();
    }
  };

  window.pin.pinsContainer.addEventListener('click', onOpenDialogClick);

  window.pin.pinsContainer.addEventListener('keydown', onOpenDialogKeyPress);

  window.card.dialogClose.addEventListener('click', onCloseDialogClick);

  window.card.dialogClose.addEventListener('keydown', onCloseDialogKeyPress);
})();
