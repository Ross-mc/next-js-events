
import { useEffect, useState } from 'react';
import classes from './comment-list.module.css';

function CommentList({eventId}) {
  const [comments, setComments] = useState(null);

  useEffect(() => {
    fetch("/api/comment")
    .then(res => res.json()).then(data => {
      setComments(arrayFromObj(data))
    })
  }, []);

  const arrayFromObj = (data) => {
    const arr = [];
    for (const key in data){
      const currentObj = data[key];
      if (currentObj.eventId === eventId){
        arr.push({...currentObj, id: key})
      }
    }
    return arr
  }
  return (
    <>
      {comments.length > 0 ? (
        <ul className={classes.comments}>
          {comments.map((comment) => (
            <li key={comment.id}>
              <p>{comment.text}</p>
              <div>
                By <address>{comment.name}</address>
              </div>
            </li>
          ))}
        </ul>
      ) : comments ? <p>No Comments for this event</p> : (
        <p>Loading...</p>
      )}
    </>
    // <ul className={classes.comments}>
    //   {/* Render list of comments - fetched from API */}
    //   {/* <li>
    //     <p>My comment is amazing!</p>
    //     <div>
    //       By <address>Maximilian</address>
    //     </div>
    //   </li>
    //   <li>
    //     <p>My comment is amazing!</p>
    //     <div>
    //       By <address>Maximilian</address>
    //     </div>
    //   </li> */}
    // </ul>
  );
}

export default CommentList;