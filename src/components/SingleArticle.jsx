import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchArticleById } from "../../api";
import ArticleVotes from "./ArticleVotes";
import CommentButton from "./SingleArticleCommentButton";

export default function SingleArticle() {
  const { article_id } = useParams();
  const [article, setArticle] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchArticleById(article_id)
      .then(({ data: { article } }) => {
        console.log(article);

        setArticle(article);
        setIsLoading(false);
      })
      .catch(() => {
        setIsError(true);
      });
  }, [article_id]);

  return isError ? (
    "Error"
  ) : isLoading ? (
    "Page Loading"
  ) : (
    <section className="section-container">
      <article className="SingleArticle">
        <h1>{article.title}</h1>
        <div className="aboveSingleArticle">
          <div className="SingleArticleInfo">
            <h2>{article.author}</h2>
            <p className="SingleArticleTopic">{article.topic}</p>
            <p className="SingleArticleCreatedDate">{article.created_at}</p>
          </div>
          <ArticleVotes
            article_id={article.article_id}
            currVotes={article.votes}
          />
        </div>
        <div className="singleArticleContent">
          <img src={article.article_img_url} alt="article_img" />
          <div className="ArticleBody">{article.body}</div>
        </div>
        <div className="bellowSingleArticle">
          <CommentButton />
        </div>
      </article>
    </section>
  );
}
