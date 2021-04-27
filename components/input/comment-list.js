
import { useEffect, useState } from 'react';
import classes from './comment-list.module.css';

function CommentList() {
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
      arr.push({...data[key], id: key})
    }
    return arr
  }
  return (
    <>
      {comments ? (
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
      ) : (
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