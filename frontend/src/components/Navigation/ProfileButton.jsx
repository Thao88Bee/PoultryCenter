import { useDispatch } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import * as sessionActions from "../../store/session";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const goToProfile = (e) => {
    e.preventDefault();
    navigate("/profile");
  };

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    navigate("/");
  };

  return (
    <>
      <button className="logoutBtn" onClick={logout}>
        Log Out
      </button>
      <button className="userBtn" onClick={goToProfile}>
        <FaUserCircle />
        {user.username}
      </button>
    </>
  );
}

export default ProfileButton;
