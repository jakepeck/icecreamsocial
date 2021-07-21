import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
  LoadUserList,
  LoadSelectedUser
} from '../store/actions/UserListActions'
import { Card, Button } from 'react-rainbow-components'
import store from '../store'
import moment from 'moment'

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
  const { selectedUser } = props.userListState
  const { fetchUserList } = props

  useEffect(() => {
    fetchUserList()
  }, [selectedUser, fetchUserList])

  const usersMap = props.userListState.users.map((user, idx) => {
    return (
      <Card className="userCard" key={idx}>
        <h1>{user.username}</h1>
        <p>Join Date: {moment(user.created_at).format('MMMM Do, YYYY')}</p>

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
      <Card className="userListHeaderCard">
        <h1>Current Ice Cream Socialites:</h1>
      </Card>
      <div className="grid">{usersMap}</div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList)
