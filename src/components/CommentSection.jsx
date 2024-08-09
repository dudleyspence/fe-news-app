import { useEffect, useState } from "react";
import { fetchCommentsByArticleId } from "../../api";

import AddComment from "./AddComment";
import ListControls from "./ListControls";

import SingleComment from "./SingleComment";

export default function CommentSections({ article_id, comment_count }) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [commentsPerPage, setCommentsPerPage] = useState(5);
  const [sortBy, setSortBy] = useState("votes");
  const [order, setOrder] = useState("desc");

  console.log(comments, "<<<< Comments");

  function handleNextPageClick() {
    setPageNo(pageNo + 1);
  }

  function handleNextPreviousClick() {
    setPageNo(pageNo - 1);
  }

  useEffect(() => {
    setIsLoading(true);
    if (comment_count > 0) {
      fetchCommentsByArticleId(
        article_id,
        pageNo,
        commentsPerPage,
        sortBy,
        order
      )
        .then(({ data: { comments } }) => {
          setComments(comments);
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
          setIsError(true);
          console.log(err);
        });
    } else {
      setIsLoading(false);
    }
  }, [article_id, pageNo, commentsPerPage, sortBy, order, comment_count]);

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
      {comment_count === 0 && (
        <p className="noComments">There is no comments yet for this post</p>
      )}
      <AddComment
        article_id={article_id}
        setComments={setComments}
        comments={comments}
      />
      <ListControls
        sortBy={sortBy}
        setSortBy={setSortBy}
        order={order}
        setOrder={setOrder}
        pageNo={pageNo}
        setPageNo={setPageNo}
        elementsPerPage={commentsPerPage}
        setElementsPerPage={setCommentsPerPage}
      />
      <p className="totalComments">
        Showing {lowerCommentIndex}-{upperCommentIndex} of {comment_count + " "}
        comments
      </p>

      <ul className="listOfComments">
        {comments.map((comment) => (
          <li key={comment.comment_id} className="single-comment">
            <SingleComment
              comment={comment}
              comments={comments}
              setComments={setComments}
            />
          </li>
        ))}
      </ul>

      <div className="pageControls">
        <button onClick={handleNextPageClick} disabled={isLastPage}>
          Next Page
        </button>
        <button onClick={handleNextPreviousClick} disabled={pageNo === 1}>
          Previous Page
        </button>
      </div>
    </div>
  );
}
