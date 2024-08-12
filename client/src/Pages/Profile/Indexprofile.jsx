import React from "react";
import { Tabs } from "antd";
import Products from "./Products";
import Addproduct from "./Addproduct";
import General from "./General";
const Indexprofile = () => {
  const items = [
    {
      key: "1",
      label: "Products",
      children: <Products />,
    },
    {
      key: "2",
      label: "Add product",
      children: <Addproduct />,
    },
    {
      key: "3",
      label: "Notifications",
      children: "Content of Tab Pan 2",
    },
    {
      key: "4",
      label: "General",
      children: <General />,
    },
  ];
  return (
    <Tabs defaultActiveKey="1" items={items} tabPosition="left" size="large" />
  );
};

export default Indexprofile;
