import { message } from "antd";
import React, { useEffect, useState } from "react";
import { getsaved_products, saveProduct } from "../../apicalls/products";
import { TailSpin } from "react-loader-spinner";
import HomeCard from "../../Components/Homepage/HomeCard";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../store/slices/LoaderSlice";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
const SavedIndex = () => {
  const { isProcessing } = useSelector((state) => state.reducer.loader);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [savedProducts, setSavedProducts] = useState([]);

  const [product_saves, setProduct_saves] = useState([]);

  const diplayProducts = async () => {
    try {
      dispatch(setLoader(true));
      const response = await getAllPublic_product();
      if (response.isSuccess) {
        setProduct_saves(response.productDocs);
        // console.log(products);
      } else {
        throw new Error("There is no product found ");
      }
    } catch (err) {
      return message.error(err.message);
    }
    dispatch(setLoader(false));
  };
  const saved_PRODUCTS = async () => {
    try {
      dispatch(setLoader(true));

      const response = await getsaved_products();
      if (response.isSuccess) {
        message.success(response.message);
      }
      setSavedProducts(response.saved_productDOC);
    } catch (error) {
      message.error(error.message);
    }
    dispatch(setLoader(false));
  };

  useEffect(() => {
    saved_PRODUCTS();
  }, []);
  return (
    <div>
      <div className="flex items-center justify-between px-6">
        <h1 className=" text-xl font-semibold xl:text-3xl  xl:font-bold my-4">
          Saved Prodcuts{" "}
        </h1>
        <ArrowLeftIcon
          width={25}
          height={25}
          className="cursor-pointer text-blue-600"
          onClick={() => navigate(-1)}
        />
      </div>
      {isProcessing ? (
        <div className="flex items-center justify-center h-screen">
          <TailSpin
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : (
        <div className="flex flex-col w-[60%] gap-5 lg:flex-row lg:flex-wrap lg:gap-4 lg:w-full mx-auto">
          {savedProducts && savedProducts.length > 0 && (
            <>
              {savedProducts.map((savedProduct) =>
                savedProduct.product_id.map((product) => {
                  return (
                    <HomeCard
                      key={product._id}
                      product={product}
                      saved={true}
                      saved_PRODUCTS={saved_PRODUCTS}
                      savedProducts={savedProducts}
                    />
                  );
                })
              )}
            </>
          )}
        </div>
      )}
      {savedProducts === undefined && (
        <p className="text-red-600 text-center my-10 text-3xl font-medium">
          No products are not saved yet !
        </p>
      )}
    </div>
  );
};

export default SavedIndex;
