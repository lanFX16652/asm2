import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./navbar.css";
import { logoutSuccess } from "../../redux/authSlice";

const NavBar = () => {
  const user = useSelector((state) => state.auth.login.currentUser);
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    localStorage.removeItem("userData");
    dispatch(logoutSuccess());
  };

  return (
    <nav className="navbar-container">
      <Link to="/" className="navbar-home">
        {" "}
        Home{" "}
      </Link>
      {user ? (
        <>
          <p className="navbar-user">
            {" "}
            <span> {user.email} </span>{" "}
          </p>
          <Link to="/transactions" className="navbar-transaction">
            {" "}
            Transactions
          </Link>
          <Link to="/login" className="navbar-logout" onClick={handleLogout}>
            {" "}
            Log out
          </Link>
        </>
      ) : (
        <>
          <Link to="/login" className="navbar-login">
            {" "}
            Login{" "}
          </Link>
          <Link to="/register" className="navbar-register">
            {" "}
            Sign Up
          </Link>
        </>
      )}
    </nav>
  );
};

export default NavBar;
