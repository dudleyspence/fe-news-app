import { useEffect, useState } from "react";
import { fetchCommentsByArticleId, updateCommentVotes } from "../../api";
import VotesControl from "./VotesControl";
import CreatedTime from "./CreatedTime";
import AddComment from "./AddComment";

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

  function handleSortComments(event) {
    const selectedSortBy = event.target.value;

    if (selectedSortBy === "votes_desc") {
      setSortBy("votes");
      setOrder("desc");
    } else if (selectedSortBy === "votes_asc") {
      setSortBy("votes");
      setOrder("asc");
    } else if (selectedSortBy === "created_at_desc") {
      setSortBy("created_at");
      setOrder("desc");
    } else if (selectedSortBy === "created_at_asc") {
      setSortBy("created_at");
      setOrder("asc");
    }
  }

  function handleCommentsPerPage(event) {
    const selectedCommentsPerPage = Number(event.target.value);
    setCommentsPerPage(selectedCommentsPerPage);
    setPageNo(1);
  }

  useEffect(() => {
    setIsLoading(true);
    fetchCommentsByArticleId(article_id, pageNo, commentsPerPage, sortBy, order)
      .then(({ data: { comments } }) => {
        setComments(comments);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsError(true);
        console.log(err);
      });
  }, [article_id, pageNo, commentsPerPage, sortBy, order]);

  const lowerCommentIndex = (pageNo - 1) * commentsPerPage;
  let upperCommentIndex = pageNo * commentsPerPage;

  const isLastPage = pageNo === Math.floor(comment_count / commentsPerPage) + 1;

  if (isLastPage) {
    upperCommentIndex = comment_count;
  }

  return comment_count === 0 ? (
    <p className="noComments">There is no comments yet for this post</p>
  ) : isError ? (
    "error"
  ) : isLoading ? (
    "Loading comments"
  ) : (
    <div className="comments-container">
      <AddComment
        article_id={article_id}
        setComments={setComments}
        comments={comments}
      />
      <div className="commentControls">
        <div className="sortBy">
          <label htmlFor="sortBy">Sort By:</label>
          <select
            name="sortBy"
            id="sortBy"
            onChange={handleSortComments}
            value={`${sortBy}_${order}`}
          >
            <option value="votes_desc">Most Popular</option>
            <option value="votes_asc">Least Popular</option>
            <option value="created_at_desc">Newest</option>
            <option value="created_at_asc">Oldest</option>
          </select>
        </div>
        <div className="commentsPerPage">
          <label htmlFor="commentsPerPage">Comments Per Page: </label>
          <select
            name="commentsPerPage"
            id="commentsPerPage"
            onChange={handleCommentsPerPage}
            value={commentsPerPage}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>
      <p className="totalComments">
        Showing {lowerCommentIndex}-{upperCommentIndex} of {comment_count + " "}
        comments
      </p>

      <ul className="listOfComments">
        {comments.map((comment) => (
          <li key={comment.comment_id} className="single-comment">
            <p className="comment-author">{comment.author}: </p>
            <CreatedTime timeString={comment.created_at} />
            <p className="comment-content">{comment.body}</p>
            <VotesControl
              id={comment.comment_id}
              updateVotes={updateCommentVotes}
              currVotes={comment.votes}
              isArticle={false}
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
