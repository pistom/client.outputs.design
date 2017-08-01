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
  SET_CURRENT_DESIGN_VERSION
} from '../actions/const';

const initialState = {
  frames: {},
  width: undefined,
  height: undefined,
  currentDevice: undefined,
  currentPageName: undefined,
  currentDesignVersion: undefined,
  splitScreen: 0
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

    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
}

module.exports = reducer;
