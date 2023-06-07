import axios from "axios";
import { loginFailed, loginStart, loginSuccess, registerFailed, registerStart, registerSuccess, logoutStart, logoutSuccess, logoutFailed } from "./authSlice";
import { updateDataSearch } from "./searchSlice";

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await axios.post("http://localhost:5000/login", user);
        dispatch(loginSuccess(res.data));
        navigate("/");
    } catch (err) {
        dispatch(loginFailed());
    }
};

export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart());
    try {
        await axios.post("http://localhost:5000/signup", user);
        dispatch(registerSuccess());
        navigate("/");
    } catch (err) {
        dispatch(registerFailed());
    }
}

export const logOut = async (dispatch, navigate) => {
    dispatch(logoutStart());
    try {
        await axios.get("http://localhost:5000/logout")
        dispatch(logoutSuccess());
        navigate("/")
    } catch (err) {
        dispatch(logoutFailed())
    }
}

export const searchHotel = async (dispatch, navigate) => {
    try {
        const res = await axios.post("http://localhost:5000/hotel/search")
        dispatch(updateDataSearch(res.data));
        navigate("/search")
    } catch (err) {
        console.log(err)
    }
}

