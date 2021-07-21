import { GetUserList, SetSelectedUser } from '../../services/UserListService'
import { GET_USER_LIST, SET_SELECTED_USER } from '../types'

export const LoadUserList = () => {
  return async (dispatch) => {
    try {
      const userList = await GetUserList()
      dispatch({ type: GET_USER_LIST, payload: userList })
    } catch (e) {
      console.log(e)
      throw e
    }
  }
}

export const LoadSelectedUser = (userId) => {
  return async (dispatch) => {
    try {
      const user = await SetSelectedUser(userId)
      dispatch({ type: SET_SELECTED_USER, payload: user })
    } catch (e) {
      console.log(e)
      throw e
    }
  }
}
