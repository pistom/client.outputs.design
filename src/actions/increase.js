import { INCREASE } from './const';

function action(parameter) {
  return { type: INCREASE, parameter };
}

module.exports = action;
