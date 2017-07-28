/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
import { UPDATE_FRAME_DIMENSIONS, SET_CURRENT_DEVICE } from '../actions/const';

const initialState = {
  frames: {},
  currentDevice: undefined
};

function reducer(state = initialState, action) {
  /* Keep the reducer clean - do not mutate the original state. */
  // const nextState = Object.assign({}, state);

  switch (action.type) {

    case UPDATE_FRAME_DIMENSIONS: {
      console.log("test");
      const frames = {};
      frames[action.frameId] = { frameWidth: action.frameWidth, frameHeight: action.frameHeight }
      return Object.assign({}, state, { frames });
    }

    case SET_CURRENT_DEVICE: {
      return Object.assign({}, state, {currentDevice: action.device})
    }

    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
}

module.exports = reducer;
