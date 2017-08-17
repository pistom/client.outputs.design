import {
  GET_IMAGE_FULFILLED,
  GET_IMAGE_PENDING,
  GET_IMAGE_REJECTED,
  SET_LOADING_IMAGE,
  SET_IMAGE_DIMENSIONS
} from '../actions/const';

const initialState = {
  isLoadingImage: 0,
  loadingImageError: false,
  devicesList: undefined
};

function reducer(state = initialState, action) {
  switch (action.type) {

    case SET_IMAGE_DIMENSIONS: {
      const nextState = Object.assign({}, state);
      nextState.devicesList = nextState.devicesList || {};
      nextState.devicesList[action.deviceName] = nextState.devicesList[action.deviceName] || {};
      nextState.devicesList[action.deviceName].dWidth = action.width;
      nextState.devicesList[action.deviceName].dHeight = action.height;
      return nextState;
    }

    // case SET_LOADING_IMAGE: {
    //   return Object.assign({}, state, {isLoadingImage: action.isLoading});
    // }

    case GET_IMAGE_PENDING: {
      const nextIsLoadingImage = state.isLoadingImage + 1;
      const nextState = Object.assign({}, state, {
        isLoadingImage: nextIsLoadingImage,
        loadingImageError: false
      });
      return nextState;
    }

    case GET_IMAGE_FULFILLED: {
      const nextIsLoadingImage = state.isLoadingImage - 1;
      const nextState = Object.assign({}, state, {
        isLoadingImage: nextIsLoadingImage
      });
      nextState[action.payload.pageName] = nextState[action.payload.pageName] || {};
      nextState[action.payload.pageName][action.payload.device] = nextState[action.payload.pageName][action.payload.device] || {};
      nextState[action.payload.pageName][action.payload.device][action.payload.designVersion] = action.payload.file;
      return nextState;
    }

    case GET_IMAGE_REJECTED: {
      const nextIsLoadingImage = state.isLoadingImage - 1;
      const nextState = Object.assign({}, state, {
        isLoadingImage: nextIsLoadingImage,
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
