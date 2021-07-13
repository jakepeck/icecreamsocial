const {
  USER_LIST_LOADING_TYPE,
  GET_USER_LIST,
  SET_SELECTED_USER
} = require('../types')

const iState = {
  users: [],
  usersLoading: '', // Should be type enum('Loading', 'Loaded', 'Inactive')
  selectedUser: null
}

const UserListReducer = (state = iState, action) => {
  switch (action.type) {
    case USER_LIST_LOADING_TYPE:
      return { ...state, usersLoading: action.payload }
    case GET_USER_LIST:
      return { ...state, users: action.payload }
    case SET_SELECTED_USER:
      return { ...state, selectedUser: action.payload }
    default:
      return { ...state }
  }
}

export default UserListReducer
