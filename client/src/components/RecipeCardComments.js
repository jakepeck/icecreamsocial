import CommentCard from './CommentCard'

const RecipeCardComments = (props) => {
  return (
    <div>
      {props.comments ? (
        props.comments.map((comment, idx) => (
          <CommentCard
            key={idx}
            comment={comment.comment}
            commenter_username={comment.commenter_username}
          />
        ))
      ) : (
        <p>No comments yet... Be the first to add one!</p>
      )}
    </div>
  )
}

export default RecipeCardComments
