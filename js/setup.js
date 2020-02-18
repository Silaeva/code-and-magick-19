'use strict';

(function () {
  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var WIZARD_COAT_COLORS = ['rgb(101,137,164)', 'rgb(241,43,107)', 'rgb(146,100,161)', 'rgb(56,159,117)', 'rgb(215,210,55)', 'rgb(0,0,0)'];
  var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var WIZARDS_NUMBER = 4;

  var similarListElement = document.querySelector('.setup-similar-list');
  var wizardTemplateElement = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

  var createWizards = function (number) {
    var wizards = [];
    for (var i = 0; i < number; i++) {
      wizards[i] = {
        name: window.util.getRandomElement(WIZARD_NAMES) + ' ' + window.util.getRandomElement(WIZARD_LAST_NAMES),
        coatColor: window.util.getRandomElement(WIZARD_COAT_COLORS),
        eyesColor: window.util.getRandomElement(WIZARD_EYES_COLORS)
      };
    }
    return wizards;
  };

  var renderWizard = function (wizard) {
    var wizardElement = wizardTemplateElement.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
  };

  var fillBlock = function (wizardsData) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < wizardsData.length; i++) {
      fragment.appendChild(renderWizard(wizardsData[i]));
    }
    similarListElement.appendChild(fragment);
  };

  fillBlock(createWizards(WIZARDS_NUMBER));

  document.querySelector('.setup-similar').classList.remove('hidden');

  window.setup = {
    WIZARD_COAT_COLORS: WIZARD_COAT_COLORS,
    WIZARD_EYES_COLORS: WIZARD_EYES_COLORS
  };
})();
