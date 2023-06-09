import { useState } from "react";
import "./register.css";
import { registerUser } from "../../redux/apiRequest";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const newUser = {
      username: username,
      password: password,
      fullName: fullName,
      phoneNumber: phoneNumber,
      email: email,
    };
    registerUser(newUser, dispatch, navigate);
  };

  return (
    <section className="register-container">
      <div className="register-title"> Sign up </div>
      <form onSubmit={handleRegister}>
        <div className="form-wrapper">
          <div className="input-wrapper">
            <label>USERNAME: </label>
            <input
              type="text"
              placeholder="Enter your username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="input-wrapper">
            <label>PASSWORD: </label>
            <input
              type="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="input-wrapper">
            <label>FULLNAME: </label>
            <input
              type="text"
              placeholder="Enter your fullname"
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="input-wrapper">
            <label>PHONE NUMBER: </label>
            <input
              type="number"
              placeholder="Enter your phone number"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>

          <div className="input-wrapper">
            <label>EMAIL: </label>
            <input
              type="text"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <button className="create-account-btn" type="submit"> Create account </button>
      </form>
    </section>
  );
};

export default Register;
