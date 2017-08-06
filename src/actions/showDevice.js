import { SHOW_DEVICE } from './const';

function action(showDevice) {
  return { type: SHOW_DEVICE, showDevice };
}

module.exports = action;
