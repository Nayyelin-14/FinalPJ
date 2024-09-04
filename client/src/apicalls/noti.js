import { axiosInstance } from "./axiosInstance";

export const pushNoti = async (payload) => {
  try {
    const response = await axiosInstance.post("/notify", payload);
    console.log(response);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

//get all notis
export const get_allNotis = async () => {
  try {
    const response = await axiosInstance.get("/notifications");
    console.log(response);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// "/notification-read/:noti_id",
export const markas_read = async (noti_id) => {
  try {
    const response = await axiosInstance.get(`/notification-read/${noti_id}`);
    console.log(response);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const delete_noti = async (notiId) => {
  try {
    const response = await axiosInstance.delete(
      `/notification-deleteOne/${notiId}`
    );
    console.log(response);
    return response.data;
  } catch (error) {
    return error.message;
  }
};
