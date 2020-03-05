'use strict';

(function () {
  var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

  var wizard = {
    onEyesChange: function () {},
    onCoatChange: function () {}
  };

  var wizardElement = document.querySelector('.setup-wizard');

  var wizardCoatElement = wizardElement.querySelector('.wizard-coat');
  wizardCoatElement.addEventListener('click', function () {
    var newColor = window.util.getRandomElement(WIZARD_COAT_COLORS);
    wizardCoatElement.style.fill = newColor;
    wizard.onCoatChange(newColor);
  });

  var wizardEyesElement = wizardElement.querySelector('.wizard-eyes');
  wizardEyesElement.addEventListener('click', function () {
    var newColor = window.util.getRandomElement(WIZARD_EYES_COLORS);
    wizardEyesElement.style.fill = newColor;
    wizard.onEyesChange(newColor);
  });

  window.wizard = {
    wizard: wizard
  };
})();
