import { SET_CURRENT_DESIGN_VERSION } from './const';

function action(designVersion) {
  return { type: SET_CURRENT_DESIGN_VERSION, designVersion };
}

module.exports = action;
