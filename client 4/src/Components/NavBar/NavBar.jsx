import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./navbar.css";
import { logOut } from "../../redux/apiRequest";

const NavBar = () => {
  const user = useSelector((state) => state.auth.login.currentUser);
  console.log(user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = (e) => {
    // e.preventDefault();
    logOut(dispatch, navigate);
  }

  return (
    <nav className="navbar-container">
      <Link to="/" className="navbar-home"> Home </Link>
      {user? (
        <>
        <p className="navbar-user"> <span> {user.user.email}  </span> </p>
        <Link to="/transaction" className="navbar-transaction"> Transactions</Link>
        <Link to="/login" className="navbar-logout" onClick={handleLogout}> Log out</Link>
        </>
      ) : (    
        <>
      <Link to="/login" className="navbar-login"> Login </Link>
      <Link to="/register" className="navbar-register"> Sign Up</Link>
      </>
)}
    </nav>
  );
};

export default NavBar;
