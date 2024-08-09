import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { getUserByUsername } from "../../api";

export default function Login() {
  const [username, setUsername] = useState("");
  const [isError, setIsError] = useState(false);
  const { setUserLoggedIn } = useContext(UserContext);
  let navigate = useNavigate();

  function handleLoginChange(event) {
    setUsername(event.target.value);
  }

  function handleLoginClick(event) {
    event.preventDefault();
    getUserByUsername(username)
      .then(({ data: { user } }) => {
        setUserLoggedIn(user);
        console.log(user);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
      });
  }

  return isError ? (
    "Error"
  ) : (
    <section className="loginPage">
      <form>
        <label htmlFor="username">Enter your username:</label>
        <input
          name="username"
          id="username"
          onChange={handleLoginChange}
          value={username}
          placeholder="username"
        ></input>
        <button onClick={handleLoginClick} className="styled-button">
          Login
        </button>
      </form>
    </section>
  );
}
