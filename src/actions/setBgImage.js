import { SET_BG_IMAGE } from './const';

function action(image) {
  return { type: SET_BG_IMAGE, image };
}

module.exports = action;
