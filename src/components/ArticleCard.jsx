import React from "react";

export default function ArticleCard({ article }) {
  return (
    <div className="article-card">
      <h3>{article.title}</h3>
      <div className="article-card-content">
        <div className="article-stats">
          <p>Comments: {article.comment_count}</p>
          <p>Votes: {article.votes}</p>
        </div>
        <img
          className="article-list-img"
          src={article.article_img_url}
          alt="image relating to the article"
        />
      </div>
    </div>
  );
}
