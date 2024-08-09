import { UserContext } from "../context/UserContext";
import { useContext } from "react";

export default function ProfilePage() {
  const { userLoggedIn } = useContext(UserContext);
  return (
    <div className="profile">
      <figure>
        <img src={userLoggedIn.avatar_url} alt="user avatar" />
        <p>{userLoggedIn.name}</p>
      </figure>

      <p>Username: {userLoggedIn.username}</p>
    </div>
  );
}
