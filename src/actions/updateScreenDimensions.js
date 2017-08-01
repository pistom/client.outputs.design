import { UPDATE_SCREEN_DIMENSIONS } from './const';

function action(screenWidth, screenHeight) {
  return { type: UPDATE_SCREEN_DIMENSIONS, screenWidth, screenHeight };
}

module.exports = action;
