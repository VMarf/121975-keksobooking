'use strict';

(function () {

  // Адрес, с которого получаем данные
  var GET_URL = 'https://1510.dump.academy/keksobooking/data';

  var onLoad = function (data) {
    var ads = data;
  };

  var onError = function (message) {
    console.error(message);
  };

  // Для получения данных с сервера
  var load = function (funcLoad, funcError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';
    xhr.timeout = 1000;

    xhr.addEventListener('load', function () {
      var error;

      switch (xhr.status) {
        case 200:
          onLoad(xhr.response);
          break;
        case 400:
          error = 'Неверный запрос';
          break;
        case 401:
          error = 'Пользователь не авторизован';
          break;
        case 404:
          error = 'Ничего не найдено';
          break;
        default:
          error = 'Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText;
      }

      if (error) {
        onError(error);
      }
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.open('GET', GET_URL);
    xhr.send();
  };

  // Для отправки данных из формы на сервер
  var save = function (data, funcLoad, funcError) {

  };

  window.backend = {
    load: load,
    save: save
  };
})();

// @TODO: Что-то не так с параметрами функции load
