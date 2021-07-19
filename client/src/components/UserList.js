import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
  LoadUserList,
  LoadSelectedUser
} from '../store/actions/UserListActions'
import { Card, Button } from 'react-rainbow-components'
import store from '../store'

const mapStateToProps = ({ userListState }) => {
  return { userListState }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserList: () => dispatch(LoadUserList()),
    fetchUserDetails: (userId) => dispatch(LoadSelectedUser(userId))
  }
}

const UserList = (props) => {
  useEffect(() => {
    props.fetchUserList()
  }, [props.userListState.selectedUser, props])

  // const pushToRecipePage = (recipeId) => {
  //   props.history.push(`/recipes/${recipeId}`)
  // }

  console.log(props)
  console.log(store.getState())

  const usersMap = props.userListState.users.map((user, idx) => {
    return (
      <Card key={idx}>
        <h1>{user.username}</h1>
        <p>{user.created_at}</p>
        <Button
          onClick={() => {
            props.fetchUserDetails(user.id)
            props.history.push(`/users/${user.id}`)
          }}
        >
          View User Details
        </Button>
      </Card>
    )
  })

  return (
    <div>
      <div className="grid">{usersMap}</div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList)
