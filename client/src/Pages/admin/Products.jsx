import { message, Pagination } from "antd";
import moment from "moment";
import React from "react";
import {
  aprrove_Product,
  pending_Product,
  reject_Product,
} from "../../apicalls/AuthAdmin";
// currentPage={currentPage}
// totalProducts={totalProducts}
// totalPages={totalPages}
const Products = ({
  products,
  getALLproducts,
  totalProducts,
  totalPages,
  currentPage,
}) => {
  const approveHandler = async (productId) => {
    try {
      const response = await aprrove_Product(productId);

      if (response.isSuccess) {
        message.success(response.message);
        getALLproducts();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };
  const rejectHandler = async (productId) => {
    try {
      const response = await reject_Product(productId);

      if (response.isSuccess) {
        message.success(response.message);
        getALLproducts();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const pendingHandler = async (productId) => {
    try {
      const response = await pending_Product(productId);

      if (response.isSuccess) {
        message.success(response.message);
        getALLproducts();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };
  const changePageHandle = (page) => {
    getALLproducts(page, 10);
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
                Seller
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
            {products && (
              <>
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
                          </td>{" "}
                          <td className="px-6 py-4 text-center">
                            {product.product_seller.name}
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

                            {product.product_status === "approve" && (
                              <p className="p-1 bg-green-500 rounded-lg text-white font-medium text-center">
                                {product.product_status}
                              </p>
                            )}
                            {product.product_status === "reject" && (
                              <p className="p-1 bg-red-500 rounded-lg text-white font-medium text-center">
                                {product.product_status}
                              </p>
                            )}
                          </td>
                          <td className="px-6 py-4 text-center flex gap-3">
                            {product.product_status === "approve" ? (
                              <button
                                type="button"
                                className="font-medium  text-base text-yellow-500 hover:underline hover:text-yellow-700 text-center"
                                onClick={() => pendingHandler(product._id)}
                              >
                                Pending
                              </button>
                            ) : (
                              <button
                                type="button"
                                className="font-medium  text-base text-blue-600 hover:underline hover:blue-red-600 text-center"
                                onClick={() => approveHandler(product._id)}
                              >
                                Approve
                              </button>
                            )}

                            {product.product_status === "reject" ? (
                              <button
                                type="button"
                                className="font-medium  text-base text-yellow-500 hover:underline hover:text-yellow-700 text-center"
                                onClick={() => pendingHandler(product._id)}
                              >
                                Pending
                              </button>
                            ) : (
                              <button
                                type="button"
                                className="font-medium  text-base text-red-600 hover:underline hover:text-red-600 text-center"
                                onClick={() => rejectHandler(product._id)}
                              >
                                Reject
                              </button>
                            )}
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
              </>
            )}
          </tbody>
        </table>
        <div className="flex max-w-6xl  mb-20 mt-10 justify-end mx-auto ">
          <Pagination
            current={currentPage}
            total={totalProducts}
            pageSize={10}
            onChange={changePageHandle}
          />
        </div>
      </div>
    </div>
  );
};

export default Products;
