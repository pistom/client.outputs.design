import { UPDATE_FRAME_DIMENSIONS } from './const';

function action(frameId, frameWidth, frameHeight) {
  return { type: UPDATE_FRAME_DIMENSIONS , frameId, frameWidth, frameHeight };
}

module.exports = action;
