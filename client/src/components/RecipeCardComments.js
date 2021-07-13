import CommentCard from "./CommentCard"

const RecipeCardComments = (props) => {
  console.log(props)
  let commentsMap
  if (props.comments){
  commentsMap = props.comments.map((comment, idx)=>{
    return <CommentCard key={idx} comment={comment.comment} commenter_username={comment.commenter_username}/>
  })}
  return (
    <div>Recipe Card Comments Section

      {commentsMap.length > 0 ? commentsMap : <h2>No comments yet... Be the first to add one!</h2>}
    </div>
  )
}

export default RecipeCardComments

