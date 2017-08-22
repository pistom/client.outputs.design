import {
  GET_MESSAGES_FULFILLED,
  GET_MESSAGES_PENDING,
  GET_MESSAGES_REJECTED
} from '../actions/const';

const initialState = {
  areLoadingMessages: true,
  loadingMessagesError: false,
  messages: [],
  comments: {},
  designIsAccepted: false
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_MESSAGES_PENDING: {
      const nextState = Object.assign({}, state, {
        areLoadingMessages: true,
        loadingMessagesError: false
      });
      return nextState;
    }

    case GET_MESSAGES_FULFILLED: {
      const messages = action.payload.messages;
      const designIsAccepted = messages.some((message) => (
        message.type === 'accept'
      ));
      const nextState = Object.assign({}, state, action.payload, {
        areLoadingMessages: false,
        designIsAccepted
      });
      return nextState;
    }

    case GET_MESSAGES_REJECTED: {
      const nextState = Object.assign({}, state, {
        areLoadingMessages: false,
        loadingMessagesError: true
      });
      return nextState;
    }

    default: {
      return state;
    }
  }
}

module.exports = reducer;
