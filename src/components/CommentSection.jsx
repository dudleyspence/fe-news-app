import { useEffect, useState } from "react";
import { fetchCommentsByArticleId, updateCommentVotes } from "../../api";
import VotesControl from "./VotesControl";

export default function CommentSections({ article_id, comment_count }) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [commentsPerPage, setCommentsPerPage] = useState(5);

  function handleNextPageClick() {
    setPageNo(pageNo + 1);
  }

  function handleNextPreviousClick() {
    setPageNo(pageNo - 1);
  }

  useEffect(() => {
    setIsLoading(true);
    fetchCommentsByArticleId(article_id, pageNo, commentsPerPage)
      .then(({ data: { comments } }) => {
        setComments(comments);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError(true);
        console.log(err);
      });
  }, [article_id, pageNo, commentsPerPage]);

  const lowerCommentIndex = (pageNo - 1) * commentsPerPage;
  let upperCommentIndex = pageNo * commentsPerPage;

  const isLastPage = pageNo === Math.floor(comment_count / commentsPerPage) + 1;

  if (isLastPage) {
    upperCommentIndex = comment_count;
  }

  return isError ? (
    "error"
  ) : isLoading ? (
    "Loading comments"
  ) : (
    <div className="comments-container">
      <p>
        Showing {lowerCommentIndex}-{upperCommentIndex} of {comment_count + " "}
        comments
      </p>
      <button onClick={handleNextPageClick} disabled={isLastPage}>
        Next Page
      </button>
      <button onClick={handleNextPreviousClick} disabled={pageNo === 1}>
        Previous Page
      </button>
      <ul className="listOfComments">
        {comments.map((comment) => (
          <li key={comment.comment_id} className="single-comment">
            <p className="comment-author">{comment.author}: </p>
            <p className="comment-content">{comment.body}</p>
            <VotesControl
              id={comment.comment_id}
              updateVotes={updateCommentVotes}
              currVotes={comment.votes}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
