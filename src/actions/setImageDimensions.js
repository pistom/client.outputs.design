import { SET_IMAGE_DIMENSIONS } from './const';

function action(deviceName, width, height) {
  return { type: SET_IMAGE_DIMENSIONS, deviceName, width, height };
}

module.exports = action;
