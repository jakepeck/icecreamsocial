import { GetUserList, SetSelectedUser } from '../../services/UserListService'
import { GET_USER_LIST, SET_SELECTED_USER } from '../types'

export const LoadUserList = () => {
  return async (dispatch) => {
    try {
      const userList = await GetUserList()
      console.log('Load user list called')
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
      console.log('load selected user called')
      console.log(user)
      dispatch({ type: SET_SELECTED_USER, payload: user })
    } catch (e) {
      console.log(e)
      throw e
    }
  }
}
