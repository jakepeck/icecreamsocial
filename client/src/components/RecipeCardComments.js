import CommentCard from './CommentCard'

const RecipeCardComments = (props) => {
  // console.log(props)
  let commentsMap
  if (props.comments) {
    commentsMap = props.comments.map((comment, idx) => {
      return (
        <CommentCard
          key={idx}
          comment={comment.comment}
          commenter_username={comment.commenter_username}
        />
      )
    })
  }
  return (
    <div>
      {/* Recipe Card Comments Section */}
      {commentsMap.length > 0 ? (
        commentsMap
      ) : (
        <p>No comments yet... Be the first to add one!</p>
      )}
    </div>
  )
}

export default RecipeCardComments
