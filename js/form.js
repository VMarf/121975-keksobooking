'use strict';

// Модуль, который работает с формой объявления
(function () {
  var FORM_TITLE_MIN_LENGTH = 30;
  var FORM_TITLE_MAX_LENGTH = 100;
  var FLAT_MIN_PRICE = 1000;
  var BUNGALO_MIN_PRICE = 0;
  var HOUSE_MIN_PRICE = 5000;
  var PALACE_MIN_PRICE = 10000;
  var AVAILABLE_GUESTS_NUMBER = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };
  var FIELD_BORDER = '1px solid #d9d9d3';
  var FIELD_ERROR_BORDER = '2px solid #ff0000';

  var form = document.querySelector('.notice__form');
  var formTitle = form.querySelector('#title');
  var formType = form.querySelector('#type');
  var formPrice = form.querySelector('#price');
  var formRoomNumber = form.querySelector('#room_number');
  var formCapacity = form.querySelector('#capacity');
  var formAddress = form.querySelector('#address');
  var formTimeIn = form.querySelector('#timein');
  var formTimeOut = form.querySelector('#timeout');
  var formSubmit = form.querySelector('.form__submit');

  // Для установки минимальной цены
  var setMinPrice = function (value) {
    formPrice.min = value;
    formPrice.value = value;
  };

  // Для отключения недопустимых значений из выпадающего списка с количеством мест
  var setAvailableValues = function (roomsNumber) {
    var availableValues = AVAILABLE_GUESTS_NUMBER[roomsNumber];
    var maxGuest = 0;

    for (var i = 0; i < formCapacity.length; i++) {
      var option = formCapacity[i];

      if (availableValues.indexOf(option.value) === -1) {
        option.disabled = true;
      } else {
        option.disabled = false;
        maxGuest = option.value > maxGuest ? option.value : maxGuest;
      }
    }

    formCapacity.value = maxGuest;
  };

  // Устанавливаем минимальную цену в зависимости от типа жилья
  var onFormTypeChange = function (evt) {
    var target = evt.target.value;

    switch (target) {
      case 'flat':
        setMinPrice(FLAT_MIN_PRICE);
        break;
      case 'bungalo':
        setMinPrice(BUNGALO_MIN_PRICE);
        break;
      case 'house':
        setMinPrice(HOUSE_MIN_PRICE);
        break;
      case 'palace':
        setMinPrice(PALACE_MIN_PRICE);
        break;
    }
  };

  // Отключаем элементы из выпадающего списка с количеством мест, в зависимости от количества комнат
  var onSetAvailableValues = function () {
    setAvailableValues(formRoomNumber.value);
  };

  // Синхронизируем время выезда с временем заезда
  var onFormTimeInChange = function (evt) {
    formTimeOut.value = evt.target.value;
  };

  // Синхронизируем время заезда с временем выезда
  var onFormTimeOutChange = function (evt) {
    formTimeIn.value = evt.target.value;
  };

  // Валидация заголовка объявления
  var onFormTitleValid = function () {
    if (formTitle.value.length < FORM_TITLE_MIN_LENGTH) {
      formTitle.style.border = FIELD_ERROR_BORDER;
      formTitle.setCustomValidity('Минимум ' + FORM_TITLE_MIN_LENGTH + ' символов');
    } else if (formTitle.value.length > FORM_TITLE_MAX_LENGTH) {
      formTitle.style.border = FIELD_ERROR_BORDER;
      formTitle.setCustomValidity('Максимум ' + FORM_TITLE_MAX_LENGTH + ' символов');
    } else {
      formTitle.style.border = FIELD_BORDER;
      formTitle.setCustomValidity('');
    }
  };

  // Валидация цены
  var onFormPriceValid = function () {
    if (formPrice.validity.rangeUnderflow) {
      formPrice.style.border = FIELD_ERROR_BORDER;
      formPrice.setCustomValidity('Минимальная цена ' + formPrice.min);
    } else {
      formPrice.style.border = FIELD_BORDER;
      formPrice.setCustomValidity('');
    }
  };

  // Валидация адреса
  var onFormAddressValid = function () {
    if (formAddress.value === '') {
      formAddress.style.border = FIELD_ERROR_BORDER;
      formAddress.setCustomValidity('Обязательное поле');
    } else {
      formAddress.style.border = FIELD_BORDER;
      formAddress.setCustomValidity('');
    }
  };

  window.addEventListener('load', onSetAvailableValues);

  formType.addEventListener('change', onFormTypeChange);

  formRoomNumber.addEventListener('change', onSetAvailableValues);

  formTimeIn.addEventListener('change', onFormTimeInChange);

  formTimeOut.addEventListener('change', onFormTimeOutChange);

  formSubmit.addEventListener('click', onFormTitleValid);

  formSubmit.addEventListener('click', onFormPriceValid);

  formSubmit.addEventListener('click', onFormAddressValid);
})();
