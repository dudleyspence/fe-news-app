import { setDayOfYear } from "date-fns";
import { UserContext } from "../context/UserContext";
import { useContext, useState } from "react";
import { addArticleCommentByUsername } from "../../api";

export default function AddComment({ article_id }) {
  const { userLoggedIn, setUserLoggedIn } = useContext(UserContext);
  const [comment, setComment] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function handleCommentChange(event) {
    setComment(event.target.value);
  }

  function handleCommentPost(event) {
    event.preventDefault();
    setIsLoading(true);
    const body = comment;
    const username = userLoggedIn.username;
    addArticleCommentByUsername(article_id, username, body)
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setIsError(true);
      });
  }

  return isError ? (
    "Error posting comment"
  ) : (
    <div className="addComment-container">
      <form>
        <label htmlFor="comment">Type your comment below:</label>
        <textarea
          name="comment"
          id="comment"
          onChange={handleCommentChange}
          placeholder="Comment"
        />
        <button className="styled-button" onClick={handleCommentPost}>
          Post
        </button>
      </form>
    </div>
  );
}
