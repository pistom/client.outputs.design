import { SHOW_MESSAGES_WINDOW } from './const';

function action(show) {
  return { type: SHOW_MESSAGES_WINDOW, show };
}

module.exports = action;
