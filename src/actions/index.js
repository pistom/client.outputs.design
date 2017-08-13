/* eslint-disable import/newline-after-import */
/* Exports all the actions from a single point.

Allows to import actions like so:

import {action1, action2} from '../actions/'
*/
/* Populated by react-webpack-redux:action */
import setBgImage from '../actions/setBgImage.js';
import setBgColor from '../actions/setBgColor.js';
import setLoadingImage from '../actions/setLoadingImage.js';
import getProjectData from '../actions/getProjectData.js';
import getImage from '../actions/getImage.js';
import setZoom from '../actions/setZoom.js';
import showDevice from '../actions/showDevice.js';
import setDeviceMode from '../actions/setDeviceMode.js';
import setCurrentDesignVersion from '../actions/setCurrentDesignVersion.js';
import setCurrentPageName from '../actions/setCurrentPageName.js';
import updateScreenDimensions from '../actions/updateScreenDimensions.js';
import setSplitScreen from '../actions/setSplitScreen.js';
import setCurrentDevice from '../actions/setCurrentDevice.js';
import updateFrameDimensions from './updateFrameDimensions.js';
const actions = {
  updateFrameDimensions,
  setCurrentDevice,
  setSplitScreen,
  updateScreenDimensions,
  setCurrentPageName,
  setCurrentDesignVersion,
  setDeviceMode,
  showDevice,
  setZoom,
  getImage,
  getProjectData,
  setLoadingImage,
  setBgColor,
  setBgImage
};
module.exports = actions;
