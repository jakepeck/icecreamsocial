import {
  GetReviewList,
  SetSelectedReview
} from '../../services/ReviewListService'
import { GET_REVIEW_LIST, SET_SELECTED_REVIEW } from '../types'

export const LoadReviewList = () => {
  return async (dispatch) => {
    try {
      const reviewList = await GetReviewList()
      dispatch({ type: GET_REVIEW_LIST, payload: reviewList })
    } catch (e) {
      console.log(e)
      throw e
    }
  }
}

export const LoadSelectedReview = (reviewId) => {
  return async (dispatch) => {
    try {
      const review = await SetSelectedReview(reviewId)
      dispatch({ type: SET_SELECTED_REVIEW, payload: review })
    } catch (e) {
      console.log(e)
      throw e
    }
  }
}
