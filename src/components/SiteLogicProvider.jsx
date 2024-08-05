import React, { useState } from "react";
import Login from "./Login";
import ArticlesList from "./ArticlesList";
import { Routes, Route } from "react-router-dom";

export default function SiteLogicProvider() {
  const [articlesList, setArticlesList] = useState([]);
  const [topic, setTopic] = useState("");
  return (
    <Routes>
      <Route
        path={"/"}
        element={
          <ArticlesList
            articlesList={articlesList}
            setArticlesList={setArticlesList}
            topic={topic}
          />
        }
      />
      {/* <Route path="*" element={<Navigate to="/" />} /> */}
    </Routes>
  );
}
