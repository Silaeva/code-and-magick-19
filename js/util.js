'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var getRandomElement = function (data) {
  return data[Math.floor(Math.random() * data.length)];
};

window.util = {
  ESC_KEYCODE: ESC_KEYCODE,
  ENTER_KEYCODE: ENTER_KEYCODE,
  getRandomElement: getRandomElement
};
