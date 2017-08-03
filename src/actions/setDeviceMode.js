import { SET_DEVICE_MODE } from './const';

function action(deviceMode) {
  return { type: SET_DEVICE_MODE, deviceMode };
}

module.exports = action;
