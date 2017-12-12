import { SHOW_COMMENTS_LIST } from './const';

function action(show) {
  return { type: SHOW_COMMENTS_LIST, show };
}

module.exports = action;
