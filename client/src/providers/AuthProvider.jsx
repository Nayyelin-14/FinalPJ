import React, { useEffect } from "react";
import { checkcurrentLoginUser } from "../apicalls/auth";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const currentUser = async () => {
    try {
      const response = await checkcurrentLoginUser();
      console.log("provider", response);

      if (response.isSuccess) {
        console.log("provider", response);
      } else {
        navigate("/");
        throw new Error(response.message);
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
