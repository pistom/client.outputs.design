import { SHOW_COMMENTS } from './const';

function action(show) {
  return { type: SHOW_COMMENTS, show };
}

module.exports = action;
