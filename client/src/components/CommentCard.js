const CommentCard = (props) => {
  // console.log(props)
  const {content}  = props.comment
  const username = props.commenter_username
  return (
    <div><p> {username} {content}</p></div>
  )
}

export default CommentCard

