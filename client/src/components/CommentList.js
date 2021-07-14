import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
  LoadCommentList,
  LoadSelectedComment
} from '../store/actions/CommentListActions'
import {Card} from 'react-rainbow-components'
import store from '../store'



const mapStateToProps = ({ commentListState }) => {
  return { commentListState }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCommentList: () => dispatch(LoadCommentList()),
    fetchCommentDetails: (commentId) => dispatch(LoadSelectedComment(commentId))
  }
}

const CommentList = (props) => {
  useEffect(() => {
    props.fetchCommentList()
  }, [props.commentListState.selectedComment])

  console.log(props)
  console.log(store.getState())


  const commentsMap = props.commentListState.comments.map((comment, idx) => {
    return (
     <Card key={idx}>
       <p>{comment.created_at}</p>
       <h1>{comment.content}</h1>
       
       <button
          onClick={() => {
            props.fetchCommentDetails(comment.id)
          }}
        >
          View Comment Details
        </button>
     </Card>
    )
  })

  return (
    <div>
      {props.commentListState.selectedComment !== null ? (
        <div className="commentDetails">
          
          <h1>{props.commentListState.selectedComment.rating}</h1>
          <div>
            <h2>
              {props.commentListState.selectedComment.created_at}
            </h2>
            <h3>{props.commentListState.selectedComment.content}</h3>
          </div>

      
        </div>
      ) : (
        'Click on a comment to expand details'
      )}
      Comment List
         
      <div className="grid">{commentsMap}</div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentList)
