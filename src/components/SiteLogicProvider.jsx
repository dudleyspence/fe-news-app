import { useState, useContext } from "react";
import Login from "./Login";
import ArticlesList from "./ArticlesList";
import { Routes, Route } from "react-router-dom";
import SingleArticle from "./SingleArticle";
import { UserContext } from "../context/UserContext";
import { Navigate } from "react-router-dom";

export default function SiteLogicProvider() {
  const [articlesList, setArticlesList] = useState([]);
  const [topic, setTopic] = useState("");
  const [currArticleId, setCurrArticleId] = useState("");
  const { userLoggedIn } = useContext(UserContext);

  return (
    <Routes>
      {/* login in page */}
      <Route path="/login" element={<Login />} />
      <Route
        path={"/"}
        element={
          userLoggedIn ? (
            <ArticlesList
              articlesList={articlesList}
              setArticlesList={setArticlesList}
              topic={topic}
              setCurrArticleId={setCurrArticleId}
            />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/article/:article_id"
        element={
          userLoggedIn ? (
            <SingleArticle currArticleId={currArticleId} />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="*"
        element={userLoggedIn ? <Navigate to="/" /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}
