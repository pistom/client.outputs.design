import { combineReducers } from 'redux';
import messages from '../reducers/messages.js';
import images from '../reducers/images.js';
import data from '../reducers/data.js';
import screen from './screen.js';

const reducers = {
  screen,
  data,
  images,
  messages
};
const combined = combineReducers(reducers);
module.exports = combined;
