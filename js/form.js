'use strict';

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
  if (formTitle.value.length < 30) {
    formTitle.style.border = FIELD_ERROR_BORDER;
    formTitle.setCustomValidity('Минимум 30 символов');
  } else {
    formTitle.style.border = FIELD_BORDER;
    formTitle.setCustomValidity('');
  }
};

var onFormTypeChange = function (evt) {
  var target = evt.target.value;

  switch (target) {
    case 'flat':
      formPrice.min = 1000;
      formPrice.value = 1000;
      break;
    case 'bungalo':
      formPrice.min = 0;
      formPrice.value = 0;
      break;
    case 'house':
      formPrice.min = 5000;
      formPrice.value = 5000;
      break;
    case 'palace':
      formPrice.min = 10000;
      formPrice.value = 10000;
      break;
  }
};

var onFormRoomNumberChange = function (evt) {
  var target = evt.target.value;

  switch (target) {
    case '1':
      formCapacity.value = '1';
      break;
    case '2':
      formCapacity.value = '2';
      break;
    case '3':
      formCapacity.value = '3';
      break;
    case '100':
      formCapacity.value = '0';
      break;
  }
};

var onFormAddressInput = function () {
  if (formAddress.value.length > 0) {
    formAddress.setCustomValidity('');
  } else {
    formAddress.setCustomValidity('Обязательное поле');
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

formAddress.addEventListener('input', onFormAddressInput);

formTimeIn.addEventListener('change', onFormTimeInChange);

formTimeOut.addEventListener('change', onFormTimeOutChange);

formSubmit.addEventListener('click', onFormTitleValid);

formSubmit.addEventListener('click', onFormAddressValid);
