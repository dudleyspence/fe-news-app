import React, { useEffect, useState } from "react";
import { fetchArticles } from "../../api";
import ArticleCard from "./ArticleCard";
import { Link } from "react-router-dom";

export default function ArticlesList(props) {
  const { articlesList, setArticlesList, topic } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchArticles(topic)
      .then(({ data }) => {
        setArticlesList(data.articles);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError(true);
        setIsLoading(false);
      });
  }, [topic, setArticlesList]);

  return isError ? (
    "Error"
  ) : isLoading ? (
    <h2>is loading...</h2>
  ) : (
    <section className="section-container">
      <div id="articles-list-container">
        <ul className="articles-list">
          {articlesList.map((article) => (
            <li key={article.article_id} style={{ listStyle: "none" }}>
              <Link to={`/article/${article.article_id}`}>
                <ArticleCard article={article} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
