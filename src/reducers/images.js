import {
  GET_IMAGE_FULFILLED,
  GET_IMAGE_PENDING,
  GET_IMAGE_REJECTED
} from '../actions/const';

const initialState = {
  isLoadingImage: true,
  loadingImageError: false,
  A: {
    objectURL: undefined
  }
};

function reducer(state = initialState, action) {
  switch (action.type) {

    case GET_IMAGE_PENDING: {
      const nextState = Object.assign({}, state, {
        isLoadingImage: true,
        loadingImageError: false
      });
      return nextState;
    }

    case GET_IMAGE_FULFILLED: {
      const nextState = Object.assign({}, state, action.payload, {
        isLoadingImage: false
      });
      return nextState;
    }

    case GET_IMAGE_REJECTED: {
      const nextState = Object.assign({}, state, {
        isLoadingImage: false,
        loadingImageError: true
      });
      return nextState;
    }

    default: {
      return state;
    }
  }
}

module.exports = reducer;
