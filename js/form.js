'use strict';

var FORM_TITLE_MIN_LENGTH = 30;
var FORM_TITLE_MAX_LENGTH = 100;
var FLAT_MIN_PRICE = 1000;
var BUNGALO_MIN_PRICE = 0;
var HOUSE_MIN_PRICE = 5000;
var PALACE_MIN_PRICE = 10000;
var ROOMS_NUMBER_1 = '1';
var ROOMS_NUMBER_2 = '2';
var ROOMS_NUMBER_3 = '3';
var ROOMS_NUMBER_100 = '100';
var AVAILABLE_GUESTS_NUMBER = {
  [ROOMS_NUMBER_1]: ['1'],
  [ROOMS_NUMBER_2]: ['1', '2'],
  [ROOMS_NUMBER_3]: ['1', '2', '3'],
  [ROOMS_NUMBER_100]: ['0']
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

var setMinPrice = function (value) {
  formPrice.min = value;
  formPrice.value = value;
};

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

var onSetAvailableValues = function () {
  switch (formRoomNumber.value) {
    case ROOMS_NUMBER_1:
      setAvailableValues(ROOMS_NUMBER_1);
      break;
    case ROOMS_NUMBER_2:
      setAvailableValues(ROOMS_NUMBER_2);
      break;
    case ROOMS_NUMBER_3:
      setAvailableValues(ROOMS_NUMBER_3);
      break;
    case ROOMS_NUMBER_100:
      setAvailableValues(ROOMS_NUMBER_100);
      break;
  }
};

var onFormTimeInChange = function (evt) {
  formTimeOut.value = evt.target.value;
};

var onFormTimeOutChange = function (evt) {
  formTimeIn.value = evt.target.value;
};

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

var onFormPriceValid = function () {
  if (formPrice.value < formPrice.min) {
    formPrice.style.border = FIELD_ERROR_BORDER;
    formPrice.setCustomValidity('Минимальная цена ' + formPrice.min);
  } else {
    formPrice.style.border = FIELD_BORDER;
    formPrice.setCustomValidity('');
  }
};

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
