import { ADD_COMMENT } from './const';

function action(comment, pageName, device, version) {
  return { type: ADD_COMMENT, comment, pageName, device, version };
}

module.exports = action;
