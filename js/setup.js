'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLORS = ['rgb(101,137,164)', 'rgb(241,43,107)', 'rgb(146,100,161)', 'rgb(56,159,117)', 'rgb(215,210,55)', 'rgb(0,0,0)'];
var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var userDialogElement = document.querySelector('.setup');
userDialogElement.classList.remove('hidden');

var similarListElement = document.querySelector('.setup-similar-list');
var WizardTemplateElement = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var getRandomElement = function (data) {
  return data[Math.floor(Math.random() * data.length)];
};

var wizards = [];
var WizardsNumber = 4;

for (var i = 0; i < WizardsNumber; i++) {
  wizards[i] = {name: getRandomElement(WIZARD_NAMES) + ' ' + getRandomElement(WIZARD_LAST_NAMES), coatColor: getRandomElement(WIZARD_COAT_COLORS), eyesColor: getRandomElement(WIZARD_EYES_COLORS)};
}

var renderWizard = function (wizard) {
  var wizardElement = WizardTemplateElement.cloneNode(true);

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

fillBlock(wizards);

document.querySelector('.setup-similar').classList.remove('hidden');
