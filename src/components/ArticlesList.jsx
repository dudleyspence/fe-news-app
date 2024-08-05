import React, { useEffect, useState } from "react";
import { getArticles } from "../../api";
import Article from "./Article";

export default function ArticlesList(props) {
  const { articlesList, setArticlesList, topic } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getArticles(topic)
      .then(({ data }) => {
        console.log(data);
        setArticlesList(data.articles);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError(true);
        setIsLoading(false);
      });
  }, [topic]);

  return isError ? (
    "Error"
  ) : isLoading ? (
    <h2>is loading...</h2>
  ) : (
    <section className="section-container">
      <div id="articles-list-container">
        <ul className="articles-list">
          {articlesList.map((article) => {
            return <Article article={article} key={article.article_id} />;
          })}
        </ul>
      </div>
    </section>
  );
}
