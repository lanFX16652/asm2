import React from "react";
import classes from "./Sidebar.module.css";
import { Link } from "react-router-dom";

const Siderbar = () => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.title}>
        <h2>Admin Page</h2>
      </div>

      <div className={classes["sidebar-wrapper"]}>
        <div>
          <h4 className={classes["menu-title"]}>MAIN</h4>
          <Link to="/dashboard" className={classes["menu-item"]}>
            <div>
              <i className="bi bi-border-all"></i>
              <span>Dashboard</span>
            </div>
          </Link>
        </div>
        <div>
          <h4 className={classes["menu-title"]}>LIST</h4>
          <div className={classes["menu-item"]}>
            <i class="bi bi-person-fill"></i>
            <span>Users</span>
          </div>
          <Link to="/hotel/list" className={classes["menu-item"]}>
            <div>
              <i class="bi bi-buildings-fill"></i>
              <span>Hotels</span>
            </div>
          </Link>
          <Link to="/room/list" className={classes["menu-item"]}>
            <div>
              <i class="bi bi-calendar-fill"></i>
              <span>Rooms</span>
            </div>
          </Link>
          <Link to="/transaction/list" className={classes["menu-item"]}>
            <div>
              <i class="bi bi-truck"></i>
              <span>Transactions</span>
            </div>
          </Link>
        </div>
        <div>
          <h4 className={classes["menu-title"]}>NEW</h4>
          <Link to="/hotel/create" className={classes["menu-item"]}>
            <div>
              <i class="bi bi-buildings-fill"></i>
              <span>New Hotel</span>
            </div>
          </Link>
          <Link to="/room/create" className={classes["menu-item"]}>
            <div>
              <i class="bi bi-calendar-fill"></i>
              <span>New Room</span>
            </div>
          </Link>
        </div>
        <div>
          <h4 className={classes["menu-title"]}>USER</h4>
          <div className={classes["menu-item"]}>
            <i class="bi bi-box-arrow-right"></i>
            <span>Logout</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Siderbar;
