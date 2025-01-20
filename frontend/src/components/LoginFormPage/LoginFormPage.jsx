import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, NavLink } from "react-router-dom";
import * as sessionActions from "../../store/session";
import loginPicture from "../../images/sdwoegb.jpg";
import "./LoginForm.css";

function LoginFormPage() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const sessionUser = useSelector((state) => state.session.User);

  if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data?.errors) setErrors(data.errors);
      }
    );
  };

  const demo = (e) => {
    e.preventDefault();
    dispatch(sessionActions.demoLogin());
  };

  return (
    <>
      <div className="loginSec">
        <div className="loginFormSec">
          <h1 className="loginHeader">Log In</h1>
          <form className="loginForm" onSubmit={handleSubmit}>
            <label className="loginLabel">
              Username or Email
              <input
                className="loginInput"
                type="text"
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
                required
              />
            </label>
            <label className="loginLabel">
              Password
              <input
                className="loginInput"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            {errors.credential && <p>{errors.credential}</p>}
            <button className="loginFormBtn" type="submit">
              Log In
            </button>
            <button className="loginFormBtn" onClick={demo}>
              Log In as Demo User
            </button>
            <p className="loginPTag">
              Don&#39;t have a Account? <NavLink className="loginToSignup" to={"/signup"}>Sign Up</NavLink> here
            </p>
          </form>
        </div>
        <div className="loginPictureSec">
          <div className="loginPictureText">Sliver Duckwing OEGB</div>
          <img className="loginPicture" src={loginPicture} alt="Sliver Duckwing OEGB" />
        </div>
      </div>
    </>
  );
}

export default LoginFormPage;
