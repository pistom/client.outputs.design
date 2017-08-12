import { SET_LOADING_IMAGE } from './const';

function action(isLoading) {
  return { type: SET_LOADING_IMAGE, isLoading };
}

module.exports = action;
