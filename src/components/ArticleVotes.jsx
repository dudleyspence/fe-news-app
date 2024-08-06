import { useState } from "react";
import { updateArticleVotes } from "../../api";

export default function ArticleVotes({ article_id, currVotes }) {
  const [votes, setVotes] = useState(currVotes);
  const [userVote, setUserVote] = useState(0);

  const handleUpVote = () => {
    const initialUserVote = userVote;
    let voteChange = 0;
    if (userVote === 1) {
      // undo upvote
      voteChange = -1;
      setUserVote(0);
    } else if (userVote === -1) {
      //reverse the vote
      voteChange = 2;
      setUserVote(1);
    } else {
      voteChange = 1;
      setUserVote(1);
    }
    //update the votes optimistically ;)
    console.log(votes, "<<< Votes");
    setVotes(votes + voteChange);
    console.log(votes, "<<< Votes");

    updateArticleVotes(article_id, userVote).catch((err) => {
      console.log(err);
      setVotes(votes - userVote);
      setUserVote(initialUserVote);
    });
  };

  const handleDownVote = () => {
    const initialUserVote = userVote;
    let voteChange = 0;
    if (userVote === -1) {
      // undo downvote
      voteChange = 1;
      setUserVote(0);
    } else if (userVote === 1) {
      //reverse the vote
      voteChange = -2;
      setUserVote(-1);
    } else {
      voteChange = -1;
      setUserVote(-1);
    }

    //update the votes optimistically ;)
    console.log(votes, "<<< Votes");
    setVotes(votes + voteChange);
    console.log(votes, "<<< Votes");

    updateArticleVotes(article_id, userVote).catch((err) => {
      console.log(err);
      setVotes(votes - userVote);
      setUserVote(initialUserVote);
    });
  };

  return (
    <div className="votes-container">
      <p className="current-votes">Votes: {votes}</p>
      <button onClick={handleUpVote} className={userVote === 1 ? "vote" : ""}>
        Upvote
      </button>
      <button
        onClick={handleDownVote}
        className={userVote === -1 ? "vote" : ""}
        disabled={votes === 0}
      >
        Downvote
      </button>
    </div>
  );
}
