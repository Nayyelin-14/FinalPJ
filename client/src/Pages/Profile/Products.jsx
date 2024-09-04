import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { deleteProduct } from "../../apicalls/products";
import { message } from "antd";
Link;
const Products = ({
  products,
  setActiveTabkey,
  setEditmode,
  setEditProductId,
  getProducts,
}) => {
  useEffect(() => {
    if (products) {
      getProducts();
    }
  }, []);

  const gotoEditPage = (product_id) => {
    setEditmode(true);
    setActiveTabkey("2");
    setEditProductId(product_id);
  };
  const deletehandler = async (delete_product_id) => {
    try {
      const response = await deleteProduct(delete_product_id);
      if (response.isSuccess) {
        await getProducts(); //prodcut twy ko render t khr htl cha
        message.success(response.message);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-center">
                Product name
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Category
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Sell-Date
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Status
              </th>

              <th scope="col" className="px-6 py-3 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              <>
                {products.map((product) => {
                  return (
                    <tr
                      className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b "
                      key={product._id}
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center"
                      >
                        {product.product_name}
                      </th>
                      <td className="px-6 py-4 text-center">
                        {product.product_category}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {moment(product.createdAt).format("L")}
                      </td>
                      <td className="px-6 py-4">
                        {product.product_status === "Pending" && (
                          <p className="p-1 bg-yellow-500 rounded-lg text-white font-medium text-center">
                            {product.product_status}
                          </p>
                        )}
                        {product.product_status === "reject" && (
                          <p className="p-1 bg-red-500 rounded-lg text-white font-medium text-center">
                            {product.product_status}
                          </p>
                        )}
                        {product.product_status === "approve" && (
                          <p className="p-1 bg-green-500 rounded-lg text-white font-medium text-center">
                            {product.product_status}
                          </p>
                        )}
                      </td>

                      <td className="px-6 py-4 text-center flex gap-3">
                        <button
                          type="button"
                          className="font-medium  text-base text-green-700 hover:underline hover:text-green-700 text-center"
                          onClick={() => gotoEditPage(product._id)}
                        >
                          Upload
                        </button>
                        <button
                          type="button"
                          className="font-medium  text-base text-blue-600 hover:underline hover:text-blue-600 text-center"
                          onClick={() => gotoEditPage(product._id)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="font-medium  text-base text-red-600 hover:underline hover:text-red-600"
                          onClick={() => deletehandler(product._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </>
            ) : (
              <>
                <p className="text-xl p-3 font-medium ">No product found</p>
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
