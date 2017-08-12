import {
  GET_PROJECT_DATA_FULFILLED,
  GET_PROJECT_DATA_PENDING,
  GET_PROJECT_DATA_REJECTED,
} from '../actions/const';

const initialState = {
  isLoadingData: true,
  loadingDataError: false,
  dataReady: false
};


function reducer(state = initialState, action) {
  switch (action.type) {

    case GET_PROJECT_DATA_PENDING: {
      const nextState = Object.assign({}, state, {
        isLoadingData: true,
        loadingDataError: false
      });
      return nextState;
    }

    case GET_PROJECT_DATA_FULFILLED: {
      const nextState = Object.assign({}, state, action.payload, {
        isLoadingData: false
      });
      return nextState;
    }

    case GET_PROJECT_DATA_REJECTED: {
      const nextState = Object.assign({}, state, {
        isLoadingData: false,
        loadingDataError: true
      });
      return nextState;
    }

    default: {
      return state;
    }
  }
}

module.exports = reducer;
