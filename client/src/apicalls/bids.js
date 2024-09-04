import { axiosInstance } from "./axiosInstance";

export const leave_bids = async (payload) => {
  try {
    const response = await axiosInstance.post("/add-bids", payload);
    console.log(response);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const getallBids = async (Pid_forbids) => {
  try {
    const response = await axiosInstance.get(`/bids/${Pid_forbids}`);
    console.log(response);
    return response.data;
  } catch (error) {
    return error.message;
  }
};
