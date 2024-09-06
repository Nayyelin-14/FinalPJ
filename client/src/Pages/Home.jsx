import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/slices/UserSlice";
import Hero from "../Components/Homepage/Hero";
import Filter from "../Components/Homepage/Filter";
import HomeCard from "../Components/Homepage/HomeCard";
import { getAllPublic_product, getsaved_products } from "../apicalls/products";
import { message, Pagination } from "antd";
import { TailSpin } from "react-loader-spinner";
import { setLoader } from "../store/slices/LoaderSlice";

const Home = () => {
  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState();
  //
  const [loginToken, setLoginToken] = useState(null);
  const [products, setProducts] = useState([]);

  const [savedProducts, setSavedProducts] = useState([]);
  //
  const { isProcessing } = useSelector((state) => state.reducer.loader);
  const { user } = useSelector((state) => state.reducer.user);
  const dispatch = useDispatch();
  const expire_login_Token = () => {
    setTimeout(() => {
      setLoginToken(localStorage.removeItem("token"));
      dispatch(setUser(null));
      console.log(localStorage.getItem("token"));
    }, 3600000);
  };
  //
  const displayProducts = async (page = 1, perpage) => {
    try {
      dispatch(setLoader(true));
      const response = await getAllPublic_product(page, perpage);
      if (response.isSuccess) {
        setProducts(response.productDocs);

        setCurrentPage(response.currentPage);
        setTotalItems(response.totalProducts);
      } else {
        throw new Error("There is no product found ");
      }
      // console.log(response);
    } catch (err) {
      return message.error(err.message);
    }
    dispatch(setLoader(false));
  };

  // console.log(currentPage);
  // console.log(totalItems);
  const saved_products = async () => {
    try {
      const response = await getsaved_products();
      if (response.isSuccess) {
        setSavedProducts([...response.saved_productDOC]);

        // displayProducts();
      } else {
        console.error(response.message);
      }
      displayProducts();
    } catch (err) {
      message.error(err.message);
    }
  };

  useEffect(() => {
    expire_login_Token();
    displayProducts(1, 6);
    saved_products();
    // saved_PRODUCTS()
  }, []);

  const changePageHandle = (page) => {
    displayProducts(page, 6);
  };
  return (
    <section className="px-4">
      <div>
        <Hero setProducts={setProducts} diplayProducts={displayProducts} />
        <Filter setProducts={setProducts} diplayProducts={displayProducts} />

        {products ? (
          <>
            {isProcessing ? (
              <div className="flex items-center justify-center max-w-4xl mx-auto">
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
              <>
                <div className="flex flex-col gap-3 lg:grid lg:grid-cols-3 lg:gap-4 lg:max-w-6xl mx-auto ">
                  {products.map((product, index) => {
                    return (
                      <HomeCard
                        product={product}
                        key={index}
                        savedProducts={savedProducts}
                        saved_products={saved_products}
                        products={products}
                        displayProducts={displayProducts}
                      />
                    );
                  })}
                </div>

                <div className="flex max-w-6xl  mb-20 mt-10 justify-end mx-auto ">
                  <Pagination
                    current={currentPage}
                    total={totalItems}
                    pageSize={6}
                    onChange={changePageHandle}
                  />
                </div>
              </>
            )}
          </>
        ) : (
          <h3 className="text-3xl font-semibold text-center text-red-600 mx-auto my-10">
            No Products found in selected category
          </h3>
        )}
      </div>
    </section>
  );
};

export default Home;
