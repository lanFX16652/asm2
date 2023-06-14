import React from "react";
import { Outlet, Link } from "react-router-dom";
import classes from "./Layout.module.css";
import { useSelector } from "react-redux";

import Siderbar from "../components/Sidebar/Siderbar";

const Layout = () => {
  const user = useSelector((state) => state.auth.currentUser?.accessToken);
  

  const logOutHandler = () => {
    localStorage.removeItem("admin")
  }

  return (
    <div className={classes.wrapper}>
      <Siderbar />
      <div className={classes["content-wrapper"]}>
        <div className={classes["content-header"]}>
          {user ? (
            <Link>
              <button onClick={logOutHandler}>Logout</button>
            </Link>
          ) : (
            <Link to="/login">
              <button>Login</button>
            </Link>
          )}
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
