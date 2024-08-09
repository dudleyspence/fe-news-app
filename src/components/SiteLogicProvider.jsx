import { useState, useContext, useEffect } from "react";
import Login from "./Login";
import ArticlesList from "./ArticlesList";
import { Routes, Route } from "react-router-dom";
import SingleArticle from "./SingleArticle";
import { UserContext } from "../context/UserContext";
import { Navigate } from "react-router-dom";
import ProfilePage from "./ProfilePage";

export default function SiteLogicProvider() {
  const { userLoggedIn, setUserLoggedIn } = useContext(UserContext);
  const [isNotLoading, setIsNotLoading] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("userLoggedIn");
    if (storedUser) {
      setUserLoggedIn(JSON.parse(storedUser));
    }
    setIsNotLoading(true);
  }, []);

  useEffect(() => {
    if (userLoggedIn) {
      localStorage.setItem("userLoggedIn", JSON.stringify(userLoggedIn));
    } else {
      localStorage.removeItem("userLoggedIn");
    }
  }, [userLoggedIn]);

  return isNotLoading ? (
    <Routes>
      {/* login in page */}
      <Route path="/login" element={<Login />} />
      <Route
        path={"/"}
        element={userLoggedIn ? <ArticlesList /> : <Navigate to="/login" />}
      />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/topics/:topic" element={<ArticlesList />} />
      <Route
        path="/article/:article_id"
        element={userLoggedIn ? <SingleArticle /> : <Navigate to="/login" />}
      />
      <Route
        path="*"
        element={userLoggedIn ? <Navigate to="/" /> : <Navigate to="/login" />}
      />
    </Routes>
  ) : (
    "Page Loading"
  );
}
