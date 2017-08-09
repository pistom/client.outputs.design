import { SET_ZOOM } from './const';

function action(zoom, manual = true) {
  return { type: SET_ZOOM, zoom, manual };
}

module.exports = action;
