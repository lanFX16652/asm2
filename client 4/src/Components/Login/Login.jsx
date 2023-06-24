import "./login.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/apiRequest";
import { useEffect } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.login.currentUser);
  const loginErrorMessage = useSelector((state) => state.auth.login.error);

  const handleLogin = (e) => {
    e.preventDefault();
    const newUser = {
      email: email,
      password: password,
    };
    loginUser(newUser, dispatch, navigate);
  };

  useEffect(() => {
    if (user) navigate("/");
  }, [user]);

  return (
    <section className="login-container">
      <div className="login-title"> Log in</div>
      <div className="login-form-wrapper">
        <form onSubmit={handleLogin}>
          <div className="email-wrapper">
            <label>EMAIL</label>
            <input
              type="text"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="password-wrapper">
            <label>PASSWORD</label>
            <input
              type="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="login-Btn" type="submit">
            {" "}
            Continue{" "}
          </button>
        </form>
      </div>
      <p>{loginErrorMessage ? loginErrorMessage : ""}</p>
      <div className="login-register"> Don't have an account yet? </div>
      <Link className="login-register-link" to="/register">
        Register one for free{" "}
      </Link>
    </section>
  );
};

export default Login;
