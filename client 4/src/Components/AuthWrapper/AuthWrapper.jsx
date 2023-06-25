import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { loginSuccess } from "../../redux/authSlice";

const AuthWrapper = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    if (user) {
      dispatch(loginSuccess(user.user));
    } else {
      // navigate("/login");
    }
  }, [user?.accessToken]);

  return <Outlet />;
};

export default AuthWrapper;
