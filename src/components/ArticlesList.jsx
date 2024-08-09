import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchArticles } from "../../api";
import ArticleCard from "./ArticleCard";
import TopicsNav from "./TopicsNav";

export default function ArticlesList() {
  const [articlesList, setArticlesList] = useState([]);
  const { topic } = useParams();
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
      <TopicsNav />
      <div id="articles-list-container">
        <ul className="articles-list">
          {articlesList.map((article) => (
            <li key={article.article_id} style={{ listStyle: "none" }}>
              <ArticleCard article={article} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
