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
var shadowColor = 'rgba(0, 0, 0, 0.7)';
var currentUserColor = 'rgba(255, 0, 0, 1)';
var textColor = '#000';
var cloudColor = '#fff';

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, shadowColor);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, cloudColor);

  ctx.fillStyle = textColor;

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    var barHeight = CHART_HEIGHT * times[i] / maxTime;
    var barStartY = CLOUD_Y + (CLOUD_HEIGHT - GAP - FONT_GAP - GAP) - barHeight;
    ctx.fillText(Math.floor(times[i]), CLOUD_X + BAR_GAP + (BAR_GAP + BAR_WIDTH) * i, CLOUD_Y + (barStartY - FONT_GAP));
    ctx.fillText(players[i], CLOUD_X + BAR_GAP + (BAR_GAP + BAR_WIDTH) * i, CLOUD_Y + CLOUD_HEIGHT - PADDING);
    var getColorBar = function (array) {
      var randomBlue = 'hsl(250, ' + Math.floor(Math.random() * 100) + '%' + ', 50%)';
      if (array === 'Вы') {
        ctx.fillStyle = currentUserColor;
      } else {
        ctx.fillStyle = randomBlue;
      }
      return getColorBar;
    };
    getColorBar(players[i]);
    ctx.fillRect(CLOUD_X + BAR_GAP + (BAR_GAP + BAR_WIDTH) * i, barStartY, BAR_WIDTH, barHeight);
    ctx.fillStyle = textColor;
  }

  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', CLOUD_X + PADDING, CLOUD_Y + PADDING);
  ctx.fillText('Список результатов:', CLOUD_X + PADDING, CLOUD_Y + PADDING + FONT_GAP + GAP);
};
