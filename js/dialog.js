'use strict';

(function () {
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  // var WIZARD_COAT_COLORS = ['rgb(101,137,164)', 'rgb(241,43,107)', 'rgb(146,100,161)', 'rgb(56,159,117)', 'rgb(215,210,55)', 'rgb(0,0,0)'];
  // var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var defaultSetupPositionY = setup.style.top;
  var defaultSetupPositionX = setup.style.left;

  var popupEscPressHandler = function (evt) {
    window.util.isEscEvent(evt, closePopup);
  };

  var openPopup = function () {
    setup.classList.remove('hidden');
    document.addEventListener('keydown', popupEscPressHandler);
    // setupWizardCoatColor.addEventListener('click', coatColorChangeHandler);
    // setupWizardEyesColor.addEventListener('click', eyesColorChangeHandler);
    setupFireballColor.addEventListener('click', fireballChangeHandler);
  };

  var closePopup = function () {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', popupEscPressHandler);
    // setupWizardCoatColor.removeEventListener('click', coatColorChangeHandler);
    // setupWizardEyesColor.removeEventListener('click', eyesColorChangeHandler);
    setupFireballColor.removeEventListener('click', fireballChangeHandler);
    setup.style.top = defaultSetupPositionY;
    setup.style.left = defaultSetupPositionX;
  };

  setupOpen.addEventListener('click', function () {
    openPopup();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openPopup);
  });

  setupClose.addEventListener('click', function () {
    closePopup();
  });

  setupClose.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closePopup);
  });

  var userNameInput = setup.querySelector('.setup-user-name');

  userNameInput.addEventListener('input', function (evt) {
    evt.target.setCustomValidity('');
  });

  userNameInput.addEventListener('invalid', function () {
    if (userNameInput.validity.tooShort) {
      userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
    } else if (userNameInput.validity.tooLong) {
      userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
    } else if (userNameInput.validity.valueMissing) {
      userNameInput.setCustomValidity('Обязательное поле');
    }
  });

  // var setupWizardCoatColor = setup.querySelector('.setup-wizard .wizard-coat');
  // var setupWizardEyesColor = setup.querySelector('.setup-wizard .wizard-eyes');
  var setupFireballColor = setup.querySelector('.setup-fireball-wrap');

  /* var coatColorChangeHandler = function () {
    setupWizardCoatColor.style.fill = window.util.getRandomElement(WIZARD_COAT_COLORS);
    setup.querySelector('input[name="coat-color"]').value = setupWizardCoatColor.style.fill;
  };

  var eyesColorChangeHandler = function () {
    setupWizardEyesColor.style.fill = window.util.getRandomElement(WIZARD_EYES_COLORS);
    setup.querySelector('input[name="eyes-color"]').value = setupWizardEyesColor.style.fill;
  };*/

  var fireballChangeHandler = function () {
    var randomFireballColor = window.util.getRandomElement(FIREBALL_COLORS);
    setupFireballColor.style.backgroundColor = randomFireballColor;
    setup.querySelector('input[name="fireball-color"]').value = randomFireballColor;
  };

  // dnd

  var dialogHandler = setup.querySelector('.upload');

  dialogHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var dialogMouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setup.style.top = (setup.offsetTop - shift.y) + 'px';
      setup.style.left = (setup.offsetLeft - shift.x) + 'px';
    };

    var dialogMouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', dialogMouseMoveHandler);
      document.removeEventListener('mouseup', dialogMouseUpHandler);

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          dialogHandler.removeEventListener('click', onClickPreventDefault);
        };
        dialogHandler.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', dialogMouseMoveHandler);
    document.addEventListener('mouseup', dialogMouseUpHandler);
  });

  // 6.1

  var form = setup.querySelector('.setup-wizard-form');

  var successHandler = function () {
    setup.classList.add('hidden');
  };

  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), successHandler, window.setup.errorHandler);
    evt.preventDefault();
  });

})();
