import { SET_CURRENT_PAGE_NAME } from './const';

function action(pageName) {
  return { type: SET_CURRENT_PAGE_NAME, pageName };
}

module.exports = action;
