import React, { useEffect, useState } from "react";
import { getDetailProduct } from "../apicalls/products";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Form, Input, message } from "antd";
import profile from "../images/profile.png";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { formatDistanceToNow } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../store/slices/LoaderSlice";
import { TailSpin } from "react-loader-spinner";
import { getallBids, leave_bids } from "../apicalls/bids";
import { pushNoti } from "../apicalls/noti";

const Details = () => {
  const [product, setProduct] = useState({});
  const { productID } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [bids, setBids] = useState([]);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  //   console.log(productID);
  const [commenting, setCommenting] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.reducer.user);
  // console.log(user);
  const { isProcessing } = useSelector((state) => state.reducer.loader);
  const getDetail = async () => {
    try {
      dispatch(setLoader(true));
      const response = await getDetailProduct(productID);
      if (response.isSuccess) {
        message.success(response.message);
      }
      setProduct(response.detailDOC);
    } catch (error) {
      message.error(error.message);
    }
    dispatch(setLoader(false));
  };
  ///for bids
  const getBids = async () => {
    try {
      console.log(productID);
      const response = await getallBids(productID);
      if (response.isSuccess) {
        setBids(response.bidsDoc);
      }
    } catch (error) {
      message.error(error.message);
    }
    dispatch(setLoader(false));
  };
  // console.log(product);
  useEffect(() => {
    getDetail();
    getBids();
  }, []);

  ///
  //comment
  const onFinishHandler = async (values) => {
    values.Product_ID = product._id;
    values.Seller_ID = product.product_seller._id;
    values.commented_userID = user._id;
    try {
      setCommenting(true);
      const response = await leave_bids(values);
      if (response.isSuccess) {
        form.resetFields();
        getBids();

        await pushNoti({
          title: "New bid placed",
          message: `New Bid is placed in ${
            product.product_name
          } by ${user.name.toUpperCase()}`,
          owner_id: product.product_seller._id,
          product_id: product._id,
          phone_number: values.phone,
        });

        message.success(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
    setCommenting(false);
  };

  return (
    <section className="flex flex-col gap-10 items-center justify-center sm:flex-row sm:items-start sm:justify-between mt-10">
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
          {" "}
          <div className="w-1/2">
            {product && product.images && product.images.length > 0 ? (
              <>
                <img
                  src={product.images[selectedImage]}
                  alt=""
                  className="w-full xl:w-[80%] h-80 object-fill object-center overflow-hidden rounded-lg "
                />
                <div className="flex items-center gap-2 mt-3">
                  {product.images.map((img, index) => {
                    return (
                      <div
                        key={index}
                        className={`border border-10 overflow-hidden border-gray-800 rounded-lg p-1 ${
                          selectedImage === index && "border-dashed"
                        }`}
                      >
                        <img
                          src={img}
                          alt=""
                          className="w-32 h-24 object-cover"
                          onClick={() => setSelectedImage(index)}
                        />
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <img
                src={profile}
                alt=""
                className="w-full  xl:w-[80%]  h-80 object-fill object-center overflow-hidden rounded-lg"
                onClick={() => setSelectedImage(index)}
              />
            )}
          </div>
          {product && product.product_category && product.product_seller && (
            <div className="w-2/3 sm:ml-20 mb-10">
              <div className="flex items-center justify-between">
                <h1 className="xl:text-3xl text-2xl  xl:font-bold font-medium ">
                  Product name - {product.product_name}
                </h1>

                <ArrowLeftIcon
                  width={25}
                  height={25}
                  className="text-blue-600 cursor-pointer"
                  onClick={() => navigate(-1)}
                />
              </div>
              <p className="text-lg mt-4 font-medium text-gray-400">
                Description - <span>{product.product_description}</span>
              </p>
              <hr />
              <div className="flex items-center justify-between  mb-2">
                <div className="font-medium space-y-2">
                  <p>Price</p>
                  <p>Category</p>
                  <p>Used for</p>
                </div>
                <div className="text-gray-500 space-y-2 text-right">
                  <p>{product.product_price} Baht</p>
                  <p>
                    {product.product_category
                      .toUpperCase()
                      .replaceAll("_", " ")}
                  </p>
                  <p>{product.product_used_for}</p>
                </div>
              </div>
              <hr />
              <div className="mb-3">
                <h1 className="text-2xl mt-4 font-medium mb-2">
                  Included details
                </h1>
                {product.product_details.map((d, i) => (
                  <div className="flex items-center justify-between  " key={i}>
                    <div className="font-semibold   text-gray-400">
                      <p>{d}</p>
                    </div>
                  </div>
                ))}
              </div>
              <hr />
              <h1 className="text-2xl mt-4 font-medium mb-2">
                Seller information
              </h1>
              <div className="flex items-center justify-between  mb-2">
                <div className="font-medium space-y-2">
                  <p>Name</p>
                  <p>Email</p>
                </div>
                <div className="text-gray-500 space-y-2 text-right">
                  <p>{product.product_seller.name}</p>
                  <p>{product.product_seller.email}</p>
                </div>
              </div>
              <hr />
              <h1 className="text-2xl mt-4 font-medium mb-2">Recent Bids</h1>
              <div>
                {bids.map((bid) => (
                  <div className="mb-2 bg-white p-3 rounded-lg">
                    <h5 className="font-medium text-base">
                      {bid.commented_userID.name}
                    </h5>
                    <p className="text-gray-400 text-sm font-medium">
                      {formatDistanceToNow(new Date(bid.createdAt))} ago
                    </p>
                    <p className="text-gray-500 font-medium text-lg">
                      comment - {bid.comment_msg}
                    </p>
                  </div>
                ))}
                {bids.length === 0 && (
                  <p className="text-red-600 text-base font-medium text-center my-3">
                    No bids for this product!
                  </p>
                )}
              </div>
              <hr />
              {/* //comment */}
              {user && user._id !== product.product_seller._id && (
                <div>
                  <h1 className="text-2xl mt-4 font-medium mb-2">Bids</h1>
                  <Form
                    onFinish={onFinishHandler}
                    layout="vertical"
                    form={form}
                  >
                    <Form.Item
                      name="message"
                      label="Text "
                      rules={[
                        {
                          required: true,
                          message: "Message must contain.",
                        },
                        {
                          min: 3,
                          message: "Message must have 3 characters.",
                        },
                      ]}
                      hasFeedback
                    >
                      <Input placeholder="write something ..."></Input>
                    </Form.Item>
                    <Form.Item
                      name="phone"
                      label="Phone Number"
                      rules={[
                        {
                          required: true,
                          message: "Phone number must contains.",
                        },
                        {
                          min: 3,
                          message: "Phone number must have 3 characters.",
                        },
                      ]}
                      hasFeedback
                    >
                      <Input type="number" placeholder="phone number ..." />
                    </Form.Item>
                    <div className=" text-right mb-3">
                      <button className=" text-white font-medium text-base px-2 py-1 rounded-md bg-blue-600">
                        {commenting ? "Submitting" : "Submit"}
                      </button>
                    </div>
                  </Form>
                </div>
              )}
              {/* user._id === product.product_seller._id &&  */}
              {!user && (
                <div className="flex gap-3 items-center mt-5">
                  <p className="text-white bg-blue-600 p-1 rounded-lg">
                    <Link to={"/login"}>Login</Link>
                  </p>
                  <p>or</p>
                  <p className="text-white bg-yellow-600 p-1 rounded-lg">
                    <Link to={"/register"}>Register</Link>
                  </p>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default Details;
