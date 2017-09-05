'use strict';

// Модуль, который получает данные
window.data = (function () {

  // Массив для объявлений
  var similarAds = [];

  // Для загрузки информации с сервера
  var loadData = function (data) {
    similarAds = data;

    // TODO: Удалить после выполнения модуля
    console.log('Внутри функции loadData' + similarAds);
  };

  // Загружаем информацию с сервера
  window.backend.load(loadData, window.backend.requestError);

  // TODO: Удалить после выполнения модуля
  console.log('Внутри модуля' + similarAds);

  return similarAds;
})();
