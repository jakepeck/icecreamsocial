const {
  REVIEW_LIST_LOADING_TYPE,
  GET_REVIEW_LIST,
  SET_SELECTED_REVIEW,
  POST_REVIEW
} = require('../types')

const iState = {
  reviews: [],
  reviewsLoading: '', // Should be type enum('Loading', 'Loaded', 'Inactive')
  selectedReview: null
}

const ReviewListReducer = (state = iState, action) => {
  switch (action.type) {
    case REVIEW_LIST_LOADING_TYPE:
      return { ...state, reviewsLoading: action.payload }
    case GET_REVIEW_LIST:
      return { ...state, reviews: action.payload }
    case SET_SELECTED_REVIEW:
      return { ...state, selectedReview: action.payload }
    default:
      return { ...state }
  }
}

export default ReviewListReducer
