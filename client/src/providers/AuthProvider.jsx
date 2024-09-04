import React, { useEffect } from "react";
import { checkcurrentLoginUser } from "../apicalls/auth";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/UserSlice";

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await checkcurrentLoginUser();

      if (response.isSuccess) {
        // console.log("provider", response);
        dispatch(setUser(response.LoginUser));
      } else {
        localStorage.removeItem("token");
        dispatch(setUser(null));
        navigate("/");
        if (token) {
          throw new Error(response.message);
        }
      }
    } catch (err) {
      message.error(err.message);
    }
  };

  useEffect(() => {
    currentUser();
  }, []);
  return <section>{children}</section>;
};

export default AuthProvider;
