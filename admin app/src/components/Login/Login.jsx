import classes from "./Login.module.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginAction } from "../../redux/authSlice";
import { useSelector } from "react-redux";
// import {loginUser} from "../../redux/apiRequest";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.auth.error);
console.log()
  const handleLogin = (e) => {
    e.preventDefault();
    const loginData = {
      email: email,
      password: password,
    };

    dispatch(
      loginAction({
        loginData,
        navigate,
      })
    );
  };

  return (
    <section className={classes["login-container"]}>
      <div className={classes["login-title"]}> Log in</div>
      <form className={classes.form} onSubmit={handleLogin}>
        <label>EMAIL</label>
        <input
          className={classes.input}
          type="text"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>PASSWORD</label>
        <input
          className={classes.input}
          type="password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <p>{error ? error : ""}</p>
        <button className={classes.button} type="submit">
          Continue
        </button>
      </form>
    </section>
  );
};

export default Login;
