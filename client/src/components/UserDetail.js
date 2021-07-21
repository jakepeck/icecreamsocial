import { connect } from 'react-redux'
import {
  LoadUserList,
  LoadSelectedUser
} from '../store/actions/UserListActions'
import React, { useEffect } from 'react'
import { Card } from 'react-rainbow-components'
import { Link } from 'react-router-dom'

const mapStateToProps = ({ userListState }) => {
  return { userListState }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserList: () => dispatch(LoadUserList()),
    fetchUserDetails: (userId) => dispatch(LoadSelectedUser(userId))
  }
}

const UserDetail = (props) => {
  console.log(props)
  const { fetchUserDetails } = props

  useEffect(() => {
    console.log('Products useEffect firing')
    fetchUserDetails(props.match.params.user_id)
  }, [props.match.params.user_id, fetchUserDetails])

  return (
    <div>
      {props.userListState.selectedUser !== null ? (
        <Card>
          <div className="userDetails">
            <h1>{props.userListState.selectedUser.user.username}</h1>
            <div>
              <h2>{props.userListState.selectedUser.user.created_at}</h2>
              <h3>
                Recent Recipes from{' '}
                {props.userListState.selectedUser.user.username}
              </h3>
              {props.userListState.selectedUser.user_recipes.length > 0 ? (
                <div>
                  {props.userListState.selectedUser.user_recipes.map(
                    (recipe, idx) => (
                      <div key={idx}>
                        {' '}
                        <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
                      </div>
                    )
                  )}
                </div>
              ) : (
                <h4>No recipes posted by this member yet</h4>
              )}

              <h3>
                Recent Comments from{' '}
                {props.userListState.selectedUser.user.username}
              </h3>
              {props.userListState.selectedUser.user_comments.length > 0 ? (
                <div>
                  {props.userListState.selectedUser.user_comments.map(
                    (comment, idx) => (
                      <div key={idx}>{comment.content}</div>
                    )
                  )}
                </div>
              ) : (
                <h4>No comments posted by this member yet</h4>
              )}
            </div>
          </div>
        </Card>
      ) : (
        'Error retrieving details for the selected user, please go back to the users page and press "View User Details" for the user you are trying to view.'
      )}
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDetail)
