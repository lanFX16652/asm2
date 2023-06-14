import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { updateUser } from "../../redux/authSlice";

const AuthWrapper = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("admin"));

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
      dispatch(updateUser(user));
    } else {
      navigate("/login");
    }
  }, [user?.accessToken]);

  return children;
};

export default AuthWrapper;
