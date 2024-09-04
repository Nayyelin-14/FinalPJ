import React, { useEffect, useState } from "react";
import { Form, Input, Row, Col, Select, Checkbox, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import {
  EllipsisHorizontalIcon,
  SquaresPlusIcon,
} from "@heroicons/react/24/solid";
import {
  getOldProductData,
  sellProduct,
  updateProduct,
} from "../../apicalls/products";

import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../store/slices/LoaderSlice";

const ProductFrom = ({
  setActiveTabkey,
  editmode,
  editProductId,
  getproducts,
}) => {
  const [form] = Form.useForm();
  const [seller_id, setSeller_id] = useState(null);

  const { isProcessing } = useSelector((state) => state.reducer.loader);
  const dispatch = useDispatch();
  dispatch(setLoader(false));
  // console.log(isProcessing);

  const options = [
    { value: "mobile_phones", label: "Mobile Phones" },
    { value: "laptops_computers", label: "Laptops & Computers" },
    { value: "tablets_accessories", label: "Tablets & Accessories" },
    { value: "cameras_photography", label: "Cameras & Photography" },
    { value: "audio_headphones", label: "Audio & Headphones" },
    { value: "wearable_technology", label: "Wearable Technology" },
    { value: "home_appliances", label: "Home Appliances" },
    { value: "video_games_consoles", label: "Video Games & Consoles" },
  ];

  const checkBoxOptions = [
    {
      label: "Accessories",
      value: "Accessories",
    },
    {
      label: "Warranty",
      value: "Warranty",
    },
    {
      label: "Voucher",
      value: "Voucher",
    },
  ];

  const onfinishHandler = async (values) => {
    try {
      dispatch(setLoader(true));
      let response;
      if (editmode) {
        values.seller_ID = seller_id;
        values.product_ID = editProductId;
        response = await updateProduct(values);
      } else {
        response = await sellProduct(values);
      }

      if (response.isSuccess) {
        message.success(response.message);
        setActiveTabkey("1");
        form.resetFields();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    } finally {
      dispatch(setLoader(false));
    }
  };
  const GET_Old_Product = async () => {
    try {
      const response = await getOldProductData(editProductId);
      console.log(response.oldProduct);
      const {
        product_description,
        product_category,
        product_details,
        product_name,
        product_price,
        product_used_for,
        product_seller,
      } = response.oldProduct;
      setSeller_id(product_seller);
      const modifiedOLDdata = {
        product_description: product_description,
        product_category: product_category,
        product_details: product_details,
        product_name: product_name,
        product_price: product_price,
        product_used_for: product_used_for,
      };

      message.success("Edit mode on");
      form.setFieldsValue(modifiedOLDdata);
    } catch (error) {
      message.error(error.message);
    }
  };
  useEffect(() => {
    if (editmode) {
      GET_Old_Product();
    } else {
      form.resetFields();
    }
  }, [editmode]);
  return (
    <div>
      <h1 className="text-2xl mt-3 mb-3 font-medium">
        {editmode
          ? "Edit your product informations"
          : "What do you want to sell"}
      </h1>
      <Form layout="vertical" onFinish={onfinishHandler} form={form}>
        <Form.Item
          name="product_name"
          label="Product_name"
          rules={[
            {
              required: true,
              message: "Please Enter product name",
            },
          ]}
          hasFeedback
        >
          <Input placeholder="Product name..."></Input>
        </Form.Item>

        <Form.Item
          label="Product description"
          name="product_description"
          rules={[
            {
              required: true,
              message: "Enter product's description",
            },
          ]}
          hasFeedback
        >
          <TextArea rows={4} placeholder="description..." />
        </Form.Item>
        <div>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label="Price"
                name="product_price"
                rules={[
                  {
                    required: true,
                    message: "Enter product's price",
                  },
                ]}
                hasFeedback
              >
                <Input placeholder="price..."></Input>
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                label="Product category"
                name="product_category"
                rules={[
                  {
                    required: true,
                    message: "Choose a category",
                  },
                ]}
                hasFeedback
              >
                <Select defaultValue={""} options={options} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Used for"
                name="product_used_for"
                rules={[
                  {
                    required: true,
                    message: "Enter product's used time",
                  },
                ]}
                hasFeedback
              >
                <Input placeholder="eg. 3 months ago..." />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="Details" name="product_details">
            <Checkbox.Group options={checkBoxOptions} defaultValue={""} />
          </Form.Item>
        </div>
        <button
          className="font-medium text-lg text-center my-2 bg-blue-500 p-2 rounded-lg flex items-center gap-2 w-full justify-center text-white"
          disabled={isProcessing}
        >
          {editmode && !isProcessing && (
            <>
              <SquaresPlusIcon width={30} />
              Update product
            </>
          )}
          {!editmode && !isProcessing && (
            <>
              <SquaresPlusIcon width={30} />
              Sell product
            </>
          )}
          {isProcessing && (
            <>
              Submitting
              <EllipsisHorizontalIcon width={30} />
            </>
          )}
        </button>
      </Form>
    </div>
  );
};
export default ProductFrom;
