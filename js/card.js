'use strict';

// Модуль для отрисовки элемента на карточке
(function () {
  var RUBLE_SYMBOL = String.fromCharCode(8381);
  var AD_TYPE_MAP = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом'
  };

  var offerDialog = document.querySelector('#offer-dialog');
  var dialogAvatar = offerDialog.querySelector('.dialog__title img');
  var dialogCloseBtn = offerDialog.querySelector('.dialog__close');
  var oldDialogPanel = offerDialog.querySelector('.dialog__panel');
  var dialogPanelTemplate = document.querySelector('#lodge-template').content;

  // Создание элемента списка достоинств в объявлении
  var createFeature = function (featuresArrayValue) {
    var feature = document.createElement('span');

    feature.classList.add('feature__image');
    feature.classList.add('feature__image--' + featuresArrayValue);

    return feature;
  };

  // Создание и заполнение новой карточки объявления
  var createNewDialogPanel = function (adInfo) {
    var newDialogPanel = dialogPanelTemplate.cloneNode(true);
    var adTitle = newDialogPanel.querySelector('.lodge__title');
    var adAddress = newDialogPanel.querySelector('.lodge__address');
    var adPrice = newDialogPanel.querySelector('.lodge__price');
    var adType = newDialogPanel.querySelector('.lodge__type');
    var adRoomsAndGuests = newDialogPanel.querySelector('.lodge__rooms-and-guests');
    var adCheckInTime = newDialogPanel.querySelector('.lodge__checkin-time');
    var adFeatures = newDialogPanel.querySelector('.lodge__features');
    var adDescription = newDialogPanel.querySelector('.lodge__description');

    adTitle.textContent = adInfo.offer.title;
    adAddress.textContent = adInfo.offer.address;
    adPrice.textContent = adInfo.offer.price + RUBLE_SYMBOL + '/ночь';
    adType.textContent = AD_TYPE_MAP[adInfo.offer.type];
    adRoomsAndGuests.textContent = 'Для ' + adInfo.offer.guests + ' гостей в ' + adInfo.offer.rooms + ' комнатах';
    adCheckInTime.textContent = 'Заезд после ' + adInfo.offer.checkin + ' , выезд до ' + adInfo.offer.checkout;
    adDescription.textContent = adInfo.offer.description;

    adInfo.offer.features.forEach(function (_item, i) {
      adFeatures.appendChild(createFeature(adInfo.offer.features[i]));
    });

    dialogAvatar.src = adInfo.author.avatar;

    return newDialogPanel;
  };

  var replaceDialogPanel = function (adInfo) {
    var newDialogPanel = createNewDialogPanel(adInfo).querySelector('.dialog__panel');

    offerDialog.replaceChild(newDialogPanel, oldDialogPanel);
    oldDialogPanel = newDialogPanel;
  };

  var showDialog = function (pin) {
    var currentAd = window.similarAds[pin.id];

    window.pin.activateCurrent(pin);
    replaceDialogPanel(currentAd);
    offerDialog.classList.remove('hidden');

    document.addEventListener('keydown', onCloseDialogEscPress);

    dialogCloseBtn.addEventListener('click', onDialogCloseBtnClick);

    dialogCloseBtn.addEventListener('keydown', onDialogCloseBtnKeyPress);
  };

  var hideDialog = function () {
    window.pin.deactivate();
    offerDialog.classList.add('hidden');

    document.removeEventListener('keydown', onCloseDialogEscPress);

    dialogCloseBtn.removeEventListener('click', onDialogCloseBtnClick);

    dialogCloseBtn.removeEventListener('keydown', onDialogCloseBtnKeyPress);
  };

  var onDialogCloseBtnClick = function () {
    hideDialog();
  };

  var onDialogCloseBtnKeyPress = function (evt) {
    if (window.util.isKeyEnter(evt)) {
      hideDialog();
    }
  };

  var onCloseDialogEscPress = function (evt) {
    if (window.util.isKeyEsc(evt)) {
      hideDialog();
    }
  };

  window.card = {
    showDialog: showDialog,
    hideDialog: hideDialog
  };
})();
