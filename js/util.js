'use strict';

(function () {
  var offerDialog = document.querySelector('#offer-dialog');
  var dialogAvatar = offerDialog.querySelector('.dialog__title img');
  var dialogClose = offerDialog.querySelector('.dialog__close');
  var dialogPanelTemplate = document.querySelector('#lodge-template').content;

  window.util = {
    offerDialog: offerDialog,
    dialogAvatar: dialogAvatar,
    dialogClose: dialogClose,
    dialogPanelTemplate: dialogPanelTemplate
  };
})();
