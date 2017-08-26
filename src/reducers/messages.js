import {
  GET_MESSAGES_FULFILLED,
  GET_MESSAGES_PENDING,
  GET_MESSAGES_REJECTED,
  SET_ADDING_COMMENT_MODE,
  ADD_COMMENT
} from '../actions/const';

const initialState = {
  areLoadingMessages: true,
  loadingMessagesError: false,
  messages: [],
  comments: {},
  designIsAccepted: false,
  addingCommentMode: false
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

    case SET_ADDING_COMMENT_MODE: {
      return Object.assign({}, state, {addingCommentMode: action.enabled})
    }

    case ADD_COMMENT: {
      const nextState = {};
      nextState.comments = Object.assign({}, state.comments);
      nextState.comments[action.pageName] = nextState.comments[action.pageName] || {};
      nextState.comments[action.pageName][action.device]
        = nextState.comments[action.pageName][action.device] || {};
      nextState.comments[action.pageName][action.device][action.version]
        = nextState.comments[action.pageName][action.device][action.version] || {};
      const commentsList
        = Object.keys(nextState.comments[action.pageName][action.device][action.version]);
      const lastCommentNumber = commentsList.length > 0 ?
        Number.parseInt(commentsList[commentsList.length - 1], 0) + 1 : 1;
      nextState.comments[action.pageName][action.device][action.version][lastCommentNumber]
        = action.comment;
      return Object.assign({}, state, nextState);
    }

    default: {
      return state;
    }
  }
}

module.exports = reducer;
