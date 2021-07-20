import {
  GetCommentList,
  SetSelectedComment,
  AddComment
} from '../../services/CommentListService'
import { ADD_COMMENT, GET_COMMENT_LIST, SET_SELECTED_COMMENT } from '../types'

export const LoadCommentList = () => {
  return async (dispatch) => {
    try {
      const commentList = await GetCommentList()
      console.log('Load comment list called')
      dispatch({ type: GET_COMMENT_LIST, payload: commentList })
    } catch (e) {
      console.log(e)
      throw e
    }
  }
}

export const LoadSelectedComment = (commentId) => {
  return async (dispatch) => {
    try {
      const comment = await SetSelectedComment(commentId)
      console.log('load selected comment called')
      console.log(comment)
      dispatch({ type: SET_SELECTED_COMMENT, payload: comment })
    } catch (e) {
      console.log(e)
      throw e
    }
  }
}

export const AddNewComment = (comment) => {
  return async (dispatch) => {
    try {
      const newComment = await AddComment(comment)
      dispatch({ type: ADD_COMMENT, payload: newComment })
    } catch (e) {
      console.log(e)
      throw e
    }
  }
}
