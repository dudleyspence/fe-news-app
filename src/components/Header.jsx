import MobileNav from "./MobileNav";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

export default function Header() {
  const { userLoggedIn, setUserLoggedIn } = useContext(UserContext);
  console.log(userLoggedIn);

  function handleTitleClick() {
    Navigate("/");
  }

  return userLoggedIn ? (
    <header>
      <div className="leftHeader">
        <MobileNav />
        <h1 onClick={handleTitleClick}>Trail Talk</h1>
      </div>
      <div className="rightHeader">
        <img src={userLoggedIn.avatar_url} alt="user avatar" />
        <p>{userLoggedIn.name}</p>
      </div>
    </header>
  ) : (
    <header>
      <div className="loginPageHeader">
        <h1>Trail Talk</h1>
      </div>
    </header>
  );
}
