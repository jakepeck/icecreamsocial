const {
  COMMENT_LIST_LOADING_TYPE,
  GET_COMMENT_LIST,
  SET_SELECTED_COMMENT,
  ADD_COMMENT
} = require('../types')

const iState = {
  comments: [],
  commentsLoading: '', // Should be type enum('Loading', 'Loaded', 'Inactive')
  selectedComment: null
}

const CommentListReducer = (state = iState, action) => {
  switch (action.type) {
    case COMMENT_LIST_LOADING_TYPE:
      return { ...state, commentsLoading: action.payload }
    case GET_COMMENT_LIST:
      return { ...state, comments: action.payload }
    case SET_SELECTED_COMMENT:
      return { ...state, selectedComment: action.payload }
    case ADD_COMMENT:
      return { ...state, comments: [...state.comments, action.payload] }
    default:
      return { ...state }
  }
}

export default CommentListReducer
