import { useState } from "react";
import Header from "./components/Header";
import SiteLogicProvider from "./components/SiteLogicProvider";
import { UserProvider } from "./context/UserContext.jsx";
import Footer from "./components/Footer";
import "../stylesheets/index.css";

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
