import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
  LoadUserList,
  LoadSelectedUser
} from '../store/actions/UserListActions'
import {Card} from 'react-rainbow-components'



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
  }, [props.userListState.selectedUser])

  console.log(props)

  const usersMap = props.userListState.users.map((user, idx) => {
    return (
     <Card key={idx}>
       <h1>{user.username}</h1>
       <p>{user.created_at}</p>
       <button
          onClick={() => {
            props.fetchUserDetails(user.id)
          }}
        >
          View User Details
        </button>
     </Card>
    )
  })

  return (
    <div>
      {props.userListState.selectedUser !== null ? (
        <div className="userDetails">
          
          <h1>{props.userListState.selectedUser.user.username}</h1>
          <div>
            <h2>
              {props.userListState.selectedUser.user.created_at}
            </h2>
            <h3>Recent Recipes from {props.userListState.selectedUser.user.username}</h3>
            {props.userListState.selectedUser.user_recipes.length > 0 ? <div>{props.userListState.selectedUser.user_recipes.map((recipe,idx)=>( <div key={idx}> {recipe.title}</div>))}</div>: <h4>No recipes posted by this member yet</h4>}
            
            <h3>Recent Comments from {props.userListState.selectedUser.user.username}</h3>
            {props.userListState.selectedUser.user_comments.length > 0 ? <div>{props.userListState.selectedUser.user_comments.map((comment,idx)=>( <div key={idx}> {comment.content}</div>))}</div>: <h4>No comments posted by this member yet</h4>}

           
          </div>

      
        </div>
      ) : (
        'Click on a user to expand details'
      )}
      User List
         
      <div className="grid">{usersMap}</div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList)
