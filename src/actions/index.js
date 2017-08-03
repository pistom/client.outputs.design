/* eslint-disable import/newline-after-import */
/* Exports all the actions from a single point.

Allows to import actions like so:

import {action1, action2} from '../actions/'
*/
/* Populated by react-webpack-redux:action */
import setDeviceMode from '../actions/setDeviceMode.js';
import setCurrentDesignVersion from '../actions/setCurrentDesignVersion.js';
import setCurrentPageName from '../actions/setCurrentPageName.js';
import updateScreenDimensions from '../actions/updateScreenDimensions.js';
import setSplitScreen from '../actions/setSplitScreen.js';
import setCurrentDevice from '../actions/setCurrentDevice.js';
import updateFrameDimensions from './updateFrameDimensions.js';
import increase from '../actions/increase.js';
const actions = {
  increase,
  updateFrameDimensions,
  setCurrentDevice,
  setSplitScreen,
  updateScreenDimensions,
  setCurrentPageName,
  setCurrentDesignVersion,
  setDeviceMode
};
module.exports = actions;
