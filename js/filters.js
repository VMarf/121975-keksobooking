// TODO: Написать функцию filterByPrice для фильтрации по цене

'use strict';

// Модуль для фильтрации пинов на карте
(function () {
  var FILTER_MIN_PRICE = 10000;
  var FILTER_MAX_PRICE = 50000;

  var filters = document.querySelector('.tokyo__filters');
  var filterType = filters.querySelector('#housing_type');
  var filterPrice = filters.querySelector('#housing_price');
  var filterRooms = filters.querySelector('#housing_room-number');
  var filterGuests = filters.querySelector('#housing_guests-number');
  var filterFeaturesCollection = filters.querySelectorAll('.feature input[type="checkbox"]');
  var filterFeaturesArray = Array.prototype.slice.call(filterFeaturesCollection, 0);
  var filteredPins;

  var hideAllPins = function (pins) {
    pins.forEach(function (_item, i) {
      pins[i].classList.add('hidden');
    });
  };

  var showFilteredPins = function (pins) {
    pins.forEach(function (_item, i) {
      pins[i].classList.remove('hidden');
    });
  };

  var filterByProperty = function (filterSelect, property) {
    return function (item) {
      var id = item.id;

      if (filterSelect.value === 'any' || filterSelect.value === (window.similarAds[id].offer[property] + '')) {
        return true;
      } else {
        return false;
      }
    };
  };

  // var filterByPrice = function () {
  //   return function (item) {
  //     var id = item.id;
  //
  //     if () {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   };
  // };

  var filterByFeatures = function (item) {
    var features = [];
    var id = item.id;

    filterFeaturesArray.forEach(function (_item, i) {
      if (filterFeaturesArray[i].checked) {
        features.push(filterFeaturesArray[i].value);
      }
    });

    return features.every(function (feature) {
      return window.similarAds[id].offer.features.indexOf(feature) !== -1;
    });
  };

  var updateFilteredPins = function () {
    filteredPins = window.pins;

    // При изменении формы с фильтрами изначально скрываем все пины
    hideAllPins(filteredPins);

    // Фильтруем массив с пинами, пин объявления, которое не подходит, не попадает в filteredPins
    filteredPins = filteredPins.filter(filterByProperty(filterType, 'type'));
    // filteredPins = filteredPins.filter(filterByPrice);
    filteredPins = filteredPins.filter(filterByProperty(filterRooms, 'rooms'));
    filteredPins = filteredPins.filter(filterByProperty(filterGuests, 'guests'));
    filteredPins = filteredPins.filter(filterByFeatures);

    // После всех фильтраций показываем пины, которые соответствуют фильтрам
    showFilteredPins(filteredPins);

    console.log(filteredPins);
  };

  var onFiltersChange = function () {
    window.debounce(updateFilteredPins);
  };

  filters.addEventListener('change', onFiltersChange);
})();
