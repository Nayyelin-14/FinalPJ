import React, { useState } from "react";
import { loginUser, registerUser } from "../../apicalls/auth";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import { setUser } from "../../store/slices/UserSlice";
import { useDispatch } from "react-redux";
const Authform = ({ isLoginPage }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const handleonFinish = async (values) => {
    if (isLoginPage) {
      setSubmitting(true);
      try {
        const response = await loginUser(values);
        console.log("logined", response.isSuccess.toString());
        if (response.isSuccess === true) {
          message.success(response.message);
          localStorage.setItem("token", response.token);
          dispatch(setUser(response.token));
          navigate("/");
        } else {
          throw new Error(response.message);
        }
      } catch (err) {
        message.error(err.message);
      }
    } else {
      try {
        const response = await registerUser(values);
        if (response.isSuccess === true) {
          message.success(response.message);
          navigate("/login");
        } else {
          throw new Error(response.message);
        }
      } catch (err) {
        message.error(err.message);
      }
    }
    setSubmitting(false);
  };
  return (
    <section className="h-[100%] mt-40 w-full flex items-center justify-center">
      <div className="w-[450px]">
        <h1 className="text-2xl text-blue-600 font-bold mb-3">
          NEXT.io - {isLoginPage ? "LOGIN" : "REGISTER"}
        </h1>
        <Form
          layout="vertical"
          onFinish={handleonFinish}
          initialValues={{
            email: "", // If you want to provide initial values
            password: "",
          }}
        >
          {!isLoginPage && (
            <Form.Item
              name="name"
              label="Name"
              rules={[
                {
                  required: true,
                  message: "Enter username",
                },
              ]}
              hasFeedback
            >
              <Input placeholder="username..."></Input>
            </Form.Item>
          )}

          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Enter a valid email",
              },
            ]}
            hasFeedback
          >
            <Input placeholder="email..."></Input>
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Fill password",
              },
            ]}
            hasFeedback
          >
            <Input.Password placeholder="password..."></Input.Password>
          </Form.Item>
          <Form.Item>
            <Button
              className="w-full outline-none bg-blue-500 text-white font-medium rounded-lg py-5"
              htmlType="submit"
            >
              {isLoginPage && !submitting && "Login"}
              {!isLoginPage && !submitting && "Register"}
              {submitting && "Submitting"}
            </Button>
          </Form.Item>

          {isLoginPage ? (
            <>
              <p>
                Dont'have an account?{" "}
                <Link
                  to={"/register"}
                  className="text-blue-600 font-medium hover:text-blue-600"
                >
                  Regsiter here
                </Link>
              </p>
            </>
          ) : (
            <>
              <p>
                Already have an account?{" "}
                <Link
                  to={"/login"}
                  className="text-blue-600 font-medium hover:text-blue-600"
                >
                  Login here
                </Link>
              </p>
            </>
          )}
        </Form>
      </div>
    </section>
  );
};

export default Authform;
