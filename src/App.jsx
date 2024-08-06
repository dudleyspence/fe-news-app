import { useState } from "react";
import Header from "./components/Header";
import SiteLogicProvider from "./components/SiteLogicProvider";
import Footer from "./components/Footer";
import "../stylesheets/App.css";
import "../stylesheets/ArticlesList.css";
import "../stylesheets/singleArticle.css";
import "../stylesheets/voter.css";

function App() {
  return (
    <body id="page-container">
      <Header />
      <SiteLogicProvider />
      <Footer />
    </body>
  );
}

export default App;
