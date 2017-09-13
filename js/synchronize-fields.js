'use strict';

(function () {
  window.synchronizeFields = function (field1, field2, array1, array2, func) {
    for (var i = 0; i < field1.length; i++) {
      field1.options[i].value = array1[i];
    }

    field1.addEventListener('change', function () {
      for (i = 0; i < field1.length; i++) {
        if (field1.options[i].selected) {
          func(field2, array2[i]);
          break;
        }
      }
    });
  };
})();
