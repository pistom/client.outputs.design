import { SET_CURRENT_DEVICE } from './const';

function action(device) {
  return { type: SET_CURRENT_DEVICE, device };
}

module.exports = action;
