'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var PADDING = 20;
var FONT_GAP = 16;
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var CHART_HEIGHT = 150;
var SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
var CURRENT_USER_COLOR = 'rgba(255, 0, 0, 1)';
var TEXT_COLOR = '#000';
var CLOUD_COLOR = '#fff';

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (numbers) {
  var maxElement = numbers[0];
  for (var i = 0; i < numbers.length; i++) {
    if (numbers[i] > maxElement) {
      maxElement = numbers[i];
    }
  }
  return maxElement;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, SHADOW_COLOR);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_COLOR);

  ctx.fillStyle = TEXT_COLOR;

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    var barHeight = CHART_HEIGHT * times[i] / maxTime;
    var barStartY = CLOUD_Y + (CLOUD_HEIGHT - GAP - FONT_GAP - GAP) - barHeight;
    var barStartX = CLOUD_X + BAR_GAP + (BAR_GAP + BAR_WIDTH) * i;
    ctx.fillText(Math.floor(times[i]), barStartX, CLOUD_Y + (barStartY - FONT_GAP));
    ctx.fillText(players[i], barStartX, CLOUD_Y + CLOUD_HEIGHT - PADDING);
    var setColorBar = function (name) {
      var randomBlue = 'hsl(250, ' + Math.floor(Math.random() * 100) + '%' + ', 50%)';
      ctx.fillStyle = name === 'Вы' ? CURRENT_USER_COLOR : randomBlue;
    };
    setColorBar(players[i]);
    ctx.fillRect(barStartX, barStartY, BAR_WIDTH, barHeight);
    ctx.fillStyle = TEXT_COLOR;
  }

  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', CLOUD_X + PADDING, CLOUD_Y + PADDING + GAP);
  ctx.fillText('Список результатов:', CLOUD_X + PADDING, CLOUD_Y + PADDING + FONT_GAP + GAP);
};
