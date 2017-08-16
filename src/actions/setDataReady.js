import { SET_DATA_READY } from './const';

function action(ready) {
  return { type: SET_DATA_READY, ready };
}

module.exports = action;
