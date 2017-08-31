'use strict';

// модуль для отрисовки элемента на карточке
(function () {
  var AD_TYPE_MAP = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом'
  };

  // Создание элемента списка достоинств в объявлении
  var createFeature = function (featuresArrayValue) {
    var feature = document.createElement('span');

    feature.classList.add('feature__image');
    feature.classList.add('feature__image--' + featuresArrayValue);

    return feature;
  };

  var createNewDialogPanel = function (adInfo) {
    var newDialogPanel = window.util.dialogPanelTemplate.cloneNode(true);
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
    adPrice.textContent = adInfo.offer.price + '&#x20bd;/ночь';
    adType.textContent = AD_TYPE_MAP[adInfo.offer.type];
    adRoomsAndGuests.textContent = 'Для ' + adInfo.offer.guests + ' гостей в ' + adInfo.offer.rooms + ' комнатах';
    adCheckInTime.textContent = 'Заезд после ' + adInfo.offer.checkin + ' , выезд до ' + adInfo.offer.checkout;
    adDescription.textContent = adInfo.offer.description;

    for (var i = 0; i < adInfo.offer.features.length; i++) {
      adFeatures.appendChild(createFeature(adInfo.offer.features[i]));
    }

    window.util.dialogAvatar.src = adInfo.author.avatar;

    return newDialogPanel;
  };

  window.card = {
    replaceDialogPanel: function (currentAd) {
      var oldDialogPanel = document.querySelector('.dialog__panel');

      window.util.offerDialog.replaceChild(createNewDialogPanel(currentAd), oldDialogPanel);
    }
  };
})();
