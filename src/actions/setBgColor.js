import { SET_BG_COLOR } from './const';

function action(color) {
  return { type: SET_BG_COLOR, color };
}

module.exports = action;
