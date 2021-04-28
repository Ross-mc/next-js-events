import { useContext, useState } from 'react';
import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';
import NotificationContext from '../../store/notification-context';

function Comments(props) {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);

  const notificationCtx = useContext(NotificationContext);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    notificationCtx.showNotification({
      title: "Sending Comment..",
      message: "Sending your comment",
      status: "pending"
    })
    // send data to API
    fetch(`/api/comment/${eventId}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(commentData)
    }).then(res => {
      notificationCtx.showNotification({
        title: "Comment Added",
        message: "Your comment was successfully saved",
        status: "Success"
      })
      return res.json()
    }).then(data => console.log(data))
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList eventId={eventId}/>}
    </section>
  );
}

export default Comments;