import React, { useState } from "react";
import Login from "./Login";
import ArticlesList from "./ArticlesList";
import { Routes, Route } from "react-router-dom";
import SingleArticle from "./SingleArticle";

export default function SiteLogicProvider() {
  const [articlesList, setArticlesList] = useState([]);
  const [topic, setTopic] = useState("");
  const [currArticleId, setCurrArticleId] = useState("");
  return (
    <Routes>
      <Route
        path={"/"}
        element={
          <ArticlesList
            articlesList={articlesList}
            setArticlesList={setArticlesList}
            topic={topic}
            setCurrArticleId={setCurrArticleId}
          />
        }
      />
      <Route
        path="/article/:article_id"
        element={<SingleArticle currArticleId={currArticleId} />}
      />
      {/* <Route path="*" element={<Navigate to="/" />} /> */}
    </Routes>
  );
}
