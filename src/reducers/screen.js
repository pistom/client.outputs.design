/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
import { LOCATION_CHANGE } from 'react-router-redux';
import {
  UPDATE_FRAME_DIMENSIONS,
  SET_CURRENT_DEVICE,
  SET_SPLIT_SCREEN,
  UPDATE_SCREEN_DIMENSIONS,
  SET_CURRENT_PAGE_NAME,
  SET_CURRENT_DESIGN_VERSION,
  SET_DEVICE_MODE,
  SHOW_DEVICE,
  SET_ZOOM,
  SET_BG_COLOR,
  SET_BG_IMAGE
} from '../actions/const';

const initialState = {
  frames: {},
  width: undefined,
  height: undefined,
  currentDevice: undefined,
  currentPageName: undefined,
  currentDesignVersion: undefined,
  splitScreen: 0,
  deviceMode: false,
  showDevice: false,
  zoom: 1,
  manualZoom: false,
  bgColor: undefined,
  bgImage: undefined
};

function reducer(state = initialState, action) {
  /* Keep the reducer clean - do not mutate the original state. */
  // const nextState = Object.assign({}, state);

  switch (action.type) {

    case UPDATE_FRAME_DIMENSIONS: {
      const frames = Object.assign({}, state.frames);
      frames[action.frameId] = { frameWidth: action.frameWidth, frameHeight: action.frameHeight };
      return Object.assign({}, state, { frames });
    }

    case UPDATE_SCREEN_DIMENSIONS: {
      return Object.assign({}, state, {
        width: action.screenWidth,
        height: action.screenHeight
      });
    }

    case SET_SPLIT_SCREEN: {
      return Object.assign({}, state, { splitScreen: action.splitScreen });
    }

    case SET_CURRENT_DEVICE: {
      return Object.assign({}, state, {currentDevice: action.device});
    }

    case SET_CURRENT_PAGE_NAME: {
      return Object.assign({}, state, {currentPageName: action.pageName});
    }

    case SET_CURRENT_DESIGN_VERSION: {
      let version;
      if (state.splitScreen > 0) {
        version = 'A';
      } else if (!action.designVersion) {
        if (state.currentDesignVersion !== undefined) {
          version = state.currentDesignVersion;
        } else {
          version = 'A';
        }
      } else {
        version = action.designVersion;
      }
      return Object.assign({}, state, {currentDesignVersion: version});
    }

    case SET_DEVICE_MODE: {
      return Object.assign({}, state, {deviceMode: action.deviceMode});
    }

    case SHOW_DEVICE: {
      return Object.assign({}, state, {showDevice: action.showDevice});
    }

    case SET_ZOOM: {
      return Object.assign({}, state, {zoom: action.zoom, manualZoom: action.manual});
    }

    case SET_BG_COLOR: {
      return Object.assign({}, state, {zoom: action.zoom, bgColor: action.color});
    }

    case SET_BG_IMAGE: {
      return Object.assign({}, state, {zoom: action.zoom, bgImage: action.image});
    }

    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
}

module.exports = reducer;
