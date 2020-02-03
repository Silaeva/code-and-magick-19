'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLORS = ['rgb(101,137,164)', 'rgb(241,43,107)', 'rgb(146,100,161)', 'rgb(56,159,117)', 'rgb(215,210,55)', 'rgb(0,0,0)'];
var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var WIZARDS_NUMBER = 4;
var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';

var similarListElement = document.querySelector('.setup-similar-list');
var wizardTemplateElement = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var getRandomElement = function (data) {
  return data[Math.floor(Math.random() * data.length)];
};


var createWizards = function (number) {
  var wizards = [];
  for (var i = 0; i < number; i++) {
    wizards[i] = {
      name: getRandomElement(WIZARD_NAMES) + ' ' + getRandomElement(WIZARD_LAST_NAMES),
      coatColor: getRandomElement(WIZARD_COAT_COLORS),
      eyesColor: getRandomElement(WIZARD_EYES_COLORS)
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

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');

var popupEscPressHandler = function (evt) {
  if (evt.key === ESC_KEY) {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', popupEscPressHandler);
  setupWizardCoatColor.addEventListener('click', function () {
    coatColorChangeHandler();
  });
  setupWizardEyesColor.addEventListener('click', function () {
    eyesColorChangeHandler();
  });

  setupFireballColor.addEventListener('click', function () {
    fireballChangeHandler();
  });
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', popupEscPressHandler);
  setupWizardCoatColor.removeEventListener('click', coatColorChangeHandler);
  setupWizardEyesColor.removeEventListener('click', eyesColorChangeHandler);
  setupFireballColor.removeEventListener('click', fireballChangeHandler);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    closePopup();
  }
});

var userNameInput = setup.querySelector('.setup-user-name');

userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  }
});

var setupWizardCoatColor = setup.querySelector('.setup-wizard .wizard-coat');
var setupWizardEyesColor = setup.querySelector('.setup-wizard .wizard-eyes');
var setupFireballColor = setup.querySelector('.setup-fireball-wrap');

var coatColorChangeHandler = function () {
  setupWizardCoatColor.style.fill = getRandomElement(WIZARD_COAT_COLORS);
  setup.querySelector('input[name="coat-color"]').value = setupWizardCoatColor.style.fill;
};

var eyesColorChangeHandler = function () {
  setupWizardEyesColor.style.fill = getRandomElement(WIZARD_EYES_COLORS);
  setup.querySelector('input[name="eyes-color"]').value = setupWizardEyesColor.style.fill;
};

var fireballChangeHandler = function () {
  var randomFireballColor = getRandomElement(FIREBALL_COLORS);
  setupFireballColor.style.backgroundColor = randomFireballColor;
  setup.querySelector('input[name="fireball-color"]').value = randomFireballColor;
};
