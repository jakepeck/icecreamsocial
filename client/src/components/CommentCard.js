import { Link } from 'react-router-dom'

const CommentCard = (props) => {
  console.log(props)
  const { content } = props.comment
  const username = props.commenter_username
  return (
    <div>
      <p>
        {' '}
        <Link to={`/users/${props.comment.commenter_id}`}>
          {username}:
        </Link>{' '}
        {content}
      </p>
    </div>
  )
}

export default CommentCard
