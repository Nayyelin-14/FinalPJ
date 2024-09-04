import React, { useEffect, useState } from "react";
import { message, Tabs } from "antd";
import Products from "./Products";
import ManageProducts from "./ManageProducts";

import General from "./General";
import { getAllproducts } from "../../apicalls/products";
import { get_allNotis } from "../../apicalls/noti";
import Notification from "../../Components/Noti/Notification";
import { BellAlertIcon } from "@heroicons/react/24/solid";
const Indexprofile = () => {
  const [activeTabkey, setActiveTabkey] = useState("1");
  const [editmode, setEditmode] = useState(false);
  const [products, setProducts] = useState([]);
  const [editProductId, setEditProductId] = useState(null);
  const [notis, setNotis] = useState([]);
  const getProducts = async () => {
    try {
      const response = await getAllproducts();
      if (response.isSuccess) {
        setProducts(response.productData);
      } else {
        throw new Error("There is no product found ");
      }
    } catch (err) {
      return message.error(err.message);
    }
  };

  //get noti
  const getNotifications = async () => {
    try {
      const response = await get_allNotis();
      console.log(response);
      if (response.isSuccess) {
        setNotis(response.notiDocs);
      } else {
        throw new Error("There is no product found ");
      }
    } catch (err) {
      return message.error(err.message);
    }
  };
  //

  useEffect(() => {
    if (activeTabkey === "1") {
      setEditmode(false);
      setEditProductId(null);
    }

    getNotifications();
  }, [products]);
  const items = [
    {
      key: "1",
      label: "Products",
      children: (
        <Products
          getProducts={getProducts}
          products={products}
          setActiveTabkey={setActiveTabkey}
          setEditmode={setEditmode}
          setEditProductId={setEditProductId}
        />
      ),
    },
    {
      key: "2",
      label: "Manage product",
      children: (
        <ManageProducts
          setActiveTabkey={setActiveTabkey}
          editmode={editmode}
          editProductId={editProductId}
          getProducts={getProducts}
        />
      ),
    },
    {
      key: "3",
      label: (
        <span className="flex items-center gap-2">
          Notifications <BellAlertIcon width={20} height={20} />
          {notis && notis.length !== 0 && <span>{notis.length}</span>}
        </span>
      ),
      children: (
        <Notification notis={notis} getNotifications={getNotifications} />
      ),
    },
    {
      key: "4",
      label: "General",
      children: <General />,
    },
  ];

  const activekeyhandler = (key) => {
    setActiveTabkey(key);
    setEditmode(false);
  };
  return (
    <Tabs
      activeKey={activeTabkey}
      onChange={(key) => activekeyhandler(key)}
      items={items}
      tabPosition="left"
      size="large"
    />
  );
};

export default Indexprofile;
