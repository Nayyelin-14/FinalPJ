import { axiosInstance } from "./axiosInstance";

//register new acc and send data to server
export const registerUser = async (payload) => {
  try {
    const response = await axiosInstance.post("/register", payload);
    console.log(response);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

//login acc and fetch data from server and get token from response

export const loginUser = async (payload) => {
  try {
    const response = await axiosInstance.post("/login", payload, {
      validateStatus: () => true,
    });
    console.log(response);
    console.log(response.data);
    return response.data;
  } catch (err) {
    return err.message;
  }
};

export const checkcurrentLoginUser = async () => {
  try {
    const response = await axiosInstance.get("/get-current-user", {
      validateStatus: () => true,
    });
    console.log(response.data);
  } catch (err) {
    return err.message;
  }
};
