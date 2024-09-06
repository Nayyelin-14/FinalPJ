import { axiosInstance } from "./axiosInstance";

//sell product
export const sellProduct = async (payload) => {
  try {
    const response = await axiosInstance.post("/create-product", payload);
    console.log(response.data);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const getAllproducts = async () => {
  try {
    const response = await axiosInstance.get("/products");
    // console.log(response.data);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const getOldProductData = async (oldProid) => {
  try {
    const response = await axiosInstance.get(`/product/${oldProid}`);
    // console.log("old data ", response.data);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const updateProduct = async (payload) => {
  try {
    const response = await axiosInstance.post(`/updateProduct`, payload);
    // console.log("old data ", response.data);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const deleteProduct = async (deleteID) => {
  try {
    const response = await axiosInstance.delete(`/products/${deleteID}`);
    console.log("to delete", response.data);
    console.log(deleteID);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// export const uploadProduct_image = async (formData) => {
//   try {
//     const response = await axiosInstance.post("/uploadImage", formData, {
//       validateStatus: true,
//     });
//     console.log(response);
//     return response.data;
//   } catch (err) {
//     return err.message;
//   }
// };
export const uploadProduct_image = async (formData) => {
  try {
    const response = await axiosInstance.post("/uploadImage", formData, {
      validateStatus: function (status) {
        return status >= 200 && status < 300; // Only resolve if the status code is in the range 2xx
      },
    });
    console.log(response);
    return response.data;
  } catch (err) {
    return err.message;
  }
};

export const get_Product_Images = async (product_id) => {
  try {
    const response = await axiosInstance.get(`/product-image/${product_id}`, {
      validateStatus: function (status) {
        return status >= 200 && status < 300; // Only resolve if the status code is in the range 2xx
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const delete_savedImg = async (payload) => {
  try {
    const { productId, deleteimgId } = payload;
    const encodedImgUrl = encodeURIComponent(deleteimgId);
    // console.log(encodedImgUrl);
    const response = await axiosInstance.delete(
      `/products/images/destory/${productId}/${encodedImgUrl}`,
      {
        validateStatus: function (status) {
          return status >= 200 && status < 300; // Only resolve if the status code is in the range 2xx
        },
      }
    );
    // console.log(response.data);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const getAllPublic_product = async (page, perPage) => {
  try {
    const response = await axiosInstance.get(
      `/api/products?page=${page}&perPage=${perPage}`,
      {
        validateStatus: function (status) {
          return status >= 200 && status < 300; // Only resolve if the status code is in the range 2xx
        },
      }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const getFiltered_products = async (key, value) => {
  try {
    const response = await axiosInstance.get(
      `/api/products/filtered?${key}=${value}`
    );
    // console.log(response);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const getDetailProduct = async (productID) => {
  try {
    // console.log(productID);
    const response = await axiosInstance.get(`/api/product/${productID}`);
    console.log(response);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const saveProduct = async (P_ID) => {
  try {
    // console.log(P_ID);
    const response = await axiosInstance.post(`/saved-products/${P_ID}`, {
      validateStatus: true,
    });
    // console.log(response);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const getsaved_products = async () => {
  try {
    const response = await axiosInstance.get("/getsaved-products");

    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const deleteSaved_product = async (productID) => {
  try {
    const response = await axiosInstance.delete(
      `/deletesaved-product/${productID}`
    );
    console.log(response);
    return response.data;
  } catch (error) {
    return error.message;
  }
};
