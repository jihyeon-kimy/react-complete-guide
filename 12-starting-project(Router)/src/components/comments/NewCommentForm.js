import { useEffect, useRef } from "react";
import useHttp from "../../hooks/use-http";
import { addComment } from "../../lib/api";
import LoadingSpinner from "../ui/LoadingSpinner";

import classes from "./NewCommentForm.module.css";

// quoteId를 얻기 위한 방법으로, useParams를 사용할 수도 있고 props로 넘겨받을 수도 있다. 재사용성을 높이고 싶다면 props로 넘겨받는 것이 좋고, 해당 ID에 한하여 사용할 예정이라면 useParams를 사용해도 괜찮다.

const NewCommentForm = (props) => {
  const commentTextRef = useRef();
  const { sendRequest, status, error } = useHttp(addComment);
  const { onAddComment } = props;

  useEffect(() => {
    if (status === "completed" && !error) {
      onAddComment();
    }
  }, [status, error, onAddComment]);

  const submitFormHandler = (event) => {
    event.preventDefault();

    const enteredText = commentTextRef.current.value;

    sendRequest({
      quoteId: props.quoteId,
      // commentData: enteredText,
      commentData: { text: enteredText },
    });

    // optional: Could validate here

    // send comment to server
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      {status === "pending" && (
        <div className="centered">
          <LoadingSpinner />
        </div>
      )}
      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor="comment">Your Comment</label>
        <textarea id="comment" rows="5" ref={commentTextRef}></textarea>
      </div>
      <div className={classes.actions}>
        <button className="btn">Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
