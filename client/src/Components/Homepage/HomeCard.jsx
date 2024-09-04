import { BookmarkIcon } from "@heroicons/react/24/outline";
import profile from "../../images/profile.png";
import { Link } from "react-router-dom";
import { deleteSaved_product, saveProduct } from "../../apicalls/products";
import { message } from "antd";
import { BookmarkSlashIcon } from "@heroicons/react/24/solid";
import { useSelector } from "react-redux";
import { useEffect } from "react";

// /product/:productID
const HomeCard = ({
  product,
  products,
  saved = false,
  saved_PRODUCTS,
  savedProducts,
  updateSavedProducts,
}) => {
  const { user } = useSelector((state) => state.reducer.user);
  // console.log(user);
  const productHandler = async (productID) => {
    try {
      let response;

      if (saved) {
        response = await deleteSaved_product(productID);
      } else {
        response = await saveProduct(productID);
      }

      if (response.isSuccess) {
        if (saved) {
          saved_PRODUCTS();
          // updateSavedProducts();
        }
        message.success(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const isProductSaved = (product) => {
    return savedProducts.some((savedProduct) =>
      savedProduct.product_id.some((p) => p._id === product._id)
    );
  }; //loop htk pek ya ml
  useEffect(() => {}, [saved_PRODUCTS]);
  return (
    <div className={`${saved && "basis-1/4 mx-auto"} bg-white p-4 rounded-lg`}>
      <div className={`${saved && "flex-col justify-between gap-10"}`}>
        {product.images[0] ? (
          <Link to={`/product/${product._id}`}>
            <img
              src={product.images[0]}
              alt=""
              className="w-full h-52 object-cover rounded-lg"
            />
          </Link>
        ) : (
          <Link to={`/product/${product._id}`}>
            <img
              src={profile}
              alt=""
              className="w-full h-52 object-cover rounded-lg"
            />
          </Link>
        )}
        <p className="bg-blue-500 w-fit sm:text-[15px] text-[12px] p-1 my-1 text-white font-medium rounded-lg">
          {product.product_category.toUpperCase().replaceAll("_", " ")}
        </p>

        <div className="flex items-center justify-between">
          <p className="text-xl font-bold text-gray-700">
            <Link to={`/product/${product._id}`}>{product.product_name}</Link>
          </p>
          {user && (
            <>
              {saved ? (
                <>
                  <BookmarkSlashIcon
                    width={22}
                    height={22}
                    className="text-blue-600 cursor-pointer"
                    onClick={() => productHandler(product._id)}
                  />
                </>
              ) : (
                <>
                  {isProductSaved(product) ? (
                    <>
                      <BookmarkSlashIcon
                        width={22}
                        height={22}
                        className="text-blue-600 "
                        onClick={() =>
                          message.warning("Product is already saved!!")
                        }
                      />
                    </>
                  ) : (
                    <>
                      <BookmarkIcon
                        width={22}
                        height={22}
                        className="text-blue-600 cursor-pointer"
                        onClick={() => productHandler(product._id)}
                      />
                    </>
                  )}
                </>
              )}
            </>
          )}
        </div>

        <p className="text-gray-600">
          {product.product_description.slice(0, 100)}
        </p>
        <hr />
        <p className="font-semibold mt-2 text-right">
          {" "}
          {product.product_price} Baht
        </p>
      </div>
    </div>
  );
};

export default HomeCard;
