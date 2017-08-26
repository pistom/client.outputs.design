import { SET_ADDING_COMMENT_MODE } from './const';

function action(enabled) {
  return { type: SET_ADDING_COMMENT_MODE, enabled };
}

module.exports = action;
