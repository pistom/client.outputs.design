import { SET_SPLIT_SCREEN } from './const';

function action(s) {
  const splitScreen = s || 0;
  return { type: SET_SPLIT_SCREEN, splitScreen };
}

module.exports = action;
