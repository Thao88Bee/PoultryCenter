import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, NavLink } from "react-router-dom";
import * as sessionActions from "../../store/session";
import signupPicture from "../../../public/images/whiteoegb8.jpg"
import "./SignupForm.css";

function SignupFormPage() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const sessionUser = useSelector((state) => state.session.User);

  if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password,
        })
      ).catch(async (res) => {
        const data = await res.json();
        if (data?.errors) {
          setErrors(data.errors);
        }
      });
    }
    return setErrors({
      confirmPassword:
        "Confirm Password field must be the same as the Password field",
    });
  };

  return (
    <>
<div className="signupSec">
  <div className="signupPictureSec">
    <div className="signupPictureText">White OEGB</div>
    <img className="signupPicture" src={signupPicture} alt="" />
  </div>
  <div className="signupFormSec">
  <h1 className="signupHeader">Sign Up</h1>
      <form className="signupForm" onSubmit={handleSubmit}>
        <label className="signupLabel">
          Email
          <input
          className="signupInput"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        <label className="signupLabel">
          Username
          <input
          className="signupInput"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {errors.username && <p>{errors.username}</p>}
        <label className="signupLabel">
          First Name
          <input
          className="signupInput"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        {errors.firstName && <p>{errors.firstName}</p>}
        <label className="signupLabel">
          Last Name
          <input
          className="signupInput"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        {errors.lastName && <p>{errors.lastName}</p>}
        <label className="signupLabel">
          Password
          <input
          className="signupInput"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <label className="signupLabel">
          Confirm Password
          <input
          className="signupInput"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        <button className="signupFormBtn" type="submit">Sign Up</button>
        <p className="signupPTag">Already have a account? <NavLink className="signupToLogin" to={"/login"}>Log In</NavLink> here</p>
      </form>
  </div>
</div>
    </>
  );
}

export default SignupFormPage;
