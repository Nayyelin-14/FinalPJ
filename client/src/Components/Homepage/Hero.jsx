import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { message } from "antd";
import React, { useState } from "react";
import { getFiltered_products } from "../../apicalls/products";

const Hero = ({ setProducts, diplayProducts }) => {
  const [searchKey, setSearchKey] = useState("");

  const searchHandle = async () => {
    try {
      const response = await getFiltered_products("SearchKey", searchKey);
      if (searchKey.trim().length === 0) {
        return message.error("Enter something to search");
      }
      if (response.isSuccess) {
        message.success(response.message);
      }
      setProducts(response.filtered_product);
    } catch (error) {
      message.error(error.message);
    }
  };
  const clearHandle = () => {
    setSearchKey("");
    diplayProducts();
  };
  return (
    <div className="w-full text-center mt-10">
      <h1 className="text-4xl font-semibold text-blue-600">
        "Discover , Connect and Thrive with NEXT.IO"
      </h1>
      <p className="text-lg font-medium text-gray-500 max-w-xl mx-auto mt-2">
        Brings buyers and sellers together, proviidiing trust , communiity , and
        success .Explore , connect and thriive with us
      </p>
      <div className="max-w-sm mx-auto flex items-center  gap-2  relative mt-4">
        <div className="relative w-full">
          <input
            type="text"
            className="bg-gray-200 border-none outline-none p-2 rounded-lg w-full focus:outline-none  "
            value={searchKey}
            onChange={(e) => {
              setSearchKey(e.target.value);
            }}
          />
          <MagnifyingGlassIcon
            width={22}
            height={22}
            className="text-blue-500 absolute top-2 right-2 cursor-pointer"
            onClick={() => searchHandle()}
          />
        </div>
        <div>
          {searchKey && (
            <button
              type="button"
              className="bg-blue-600 text-white  rounded-lg text-sm font-medium p-2"
              onClick={clearHandle}
            >
              clear
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
