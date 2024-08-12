import React from "react";
import { Form, Input, Button } from "antd";
import Authform from "../Components/Authform";
const Register = () => {
  const registerhandler = (values) => {
    console.log(values);
  };
  return <Authform isLoginPage={false} />;
};

export default Register;
