'use strict';

var FORM_TITLE_MIN_LENGTH = 30;
var FLAT_MIN_PRICE = 1000;
var BUNGALO_MIN_PRICE = 0;
var HOUSE_MIN_PRICE = 5000;
var PALACE_MIN_PRICE = 10000;
var ROOMS_NUMBER_1 = '1';
var ROOMS_NUMBER_2 = '2';
var ROOMS_NUMBER_3 = '3';
var ROOMS_NUMBER_100 = '100';
var GUESTS_NUMBER_0 = '0';
var GUESTS_NUMBER_1 = '1';
var GUESTS_NUMBER_2 = '2';
var GUESTS_NUMBER_3 = '3';
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

var onFormTitleValid = function () {
  if (formTitle.value.length < FORM_TITLE_MIN_LENGTH) {
    formTitle.style.border = FIELD_ERROR_BORDER;
    formTitle.setCustomValidity('Минимум ' + FORM_TITLE_MIN_LENGTH + ' символов');
  } else {
    formTitle.style.border = FIELD_BORDER;
    formTitle.setCustomValidity('');
  }
};

var onFormTypeChange = function (evt) {
  var target = evt.target.value;

  switch (target) {
    case 'flat':
      formPrice.min = FLAT_MIN_PRICE;
      formPrice.value = FLAT_MIN_PRICE;
      break;
    case 'bungalo':
      formPrice.min = BUNGALO_MIN_PRICE;
      formPrice.value = BUNGALO_MIN_PRICE;
      break;
    case 'house':
      formPrice.min = HOUSE_MIN_PRICE;
      formPrice.value = HOUSE_MIN_PRICE;
      break;
    case 'palace':
      formPrice.min = PALACE_MIN_PRICE;
      formPrice.value = PALACE_MIN_PRICE;
      break;
  }
};

var onFormRoomNumberChange = function (evt) {
  var target = evt.target.value;

  switch (target) {
    case ROOMS_NUMBER_1:
      formCapacity.value = GUESTS_NUMBER_1;
      formCapacity[0].disabled = true;
      formCapacity[1].disabled = true;
      formCapacity[2].disabled = false;
      formCapacity[3].disabled = true;
      break;
    case ROOMS_NUMBER_2:
      formCapacity.value = GUESTS_NUMBER_2;
      formCapacity[0].disabled = true;
      formCapacity[1].disabled = false;
      formCapacity[2].disabled = false;
      formCapacity[3].disabled = true;
      break;
    case ROOMS_NUMBER_3:
      formCapacity.value = GUESTS_NUMBER_3;
      formCapacity[0].disabled = false;
      formCapacity[1].disabled = false;
      formCapacity[2].disabled = false;
      formCapacity[3].disabled = true;
      break;
    case ROOMS_NUMBER_100:
      formCapacity.value = GUESTS_NUMBER_0;
      formCapacity[0].disabled = true;
      formCapacity[1].disabled = true;
      formCapacity[2].disabled = true;
      formCapacity[3].disabled = false;
      break;
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

var onFormTimeInChange = function (evt) {
  formTimeOut.value = evt.target.value;
};

var onFormTimeOutChange = function (evt) {
  formTimeIn.value = evt.target.value;
};

formType.addEventListener('change', onFormTypeChange);

formRoomNumber.addEventListener('change', onFormRoomNumberChange);

formTimeIn.addEventListener('change', onFormTimeInChange);

formTimeOut.addEventListener('change', onFormTimeOutChange);

formSubmit.addEventListener('click', onFormTitleValid);

formSubmit.addEventListener('click', onFormAddressValid);
