import { useState } from "react";
import Header from "./components/Header";
import SiteLogicProvider from "./components/SiteLogicProvider";
import { UserProvider } from "./context/UserContext.jsx";
import Footer from "./components/Footer";
import "../stylesheets/App.css";
import "../stylesheets/ArticlesList.css";
import "../stylesheets/singleArticle.css";
import "../stylesheets/voter.css";
import "../stylesheets/header.css";
import "../stylesheets/mobileNav.css";
import "../stylesheets/comment-section.css";
import "../stylesheets/login.css";

function App() {
  return (
    <div id="page-container">
      <UserProvider>
        <Header />
        <SiteLogicProvider />
        <Footer />
      </UserProvider>
    </div>
  );
}

export default App;
