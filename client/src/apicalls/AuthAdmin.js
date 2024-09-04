import { axiosInstance } from "./axiosInstance";

//get all products
export const getAll_products = async (page, perPage) => {
  try {
    const response = await axiosInstance.get(
      `/admin/products?page=${page}&perPage=${perPage}`,
      {
        validateStatus: () => true,
      }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const aprrove_Product = async (product_id) => {
  try {
    console.log(product_id);
    const response = await axiosInstance.post(
      `/admin/product-approve/${product_id}`,
      {
        validateStatus: () => true,
      }
    );
    //     console.log(response);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const reject_Product = async (product_id) => {
  try {
    const response = await axiosInstance.post(
      `/admin/product-reject/${product_id}`,
      {
        validateStatus: () => true,
      }
    );
    //     console.log(response);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const pending_Product = async (product_id) => {
  try {
    const response = await axiosInstance.post(
      `/admin/product-pending/${product_id}`,
      {
        validateStatus: () => true,
      }
    );
    //     console.log(response);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const get_users = async () => {
  try {
    const response = await axiosInstance.get(`/users`, {
      validateStatus: () => true,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const ban_user = async (user_ID) => {
  try {
    const response = await axiosInstance.post(
      `/admin/user-status-ban/${user_ID}`,
      {
        validateStatus: () => true,
      }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const unban_user = async (user_ID) => {
  try {
    const response = await axiosInstance.post(
      `/admin/user-status-unban/${user_ID}`,
      {
        validateStatus: () => true,
      }
    );
    //     console.log(response);
    return response.data;
  } catch (error) {
    return error.message;
  }
};
