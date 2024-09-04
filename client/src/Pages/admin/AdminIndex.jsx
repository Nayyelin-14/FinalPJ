import { message, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import Products from "./Products";
import ManageUsers from "./ManageUsers";
import { get_users, getAll_products } from "../../apicalls/AuthAdmin";
import AdminGeneral from "./AdminGeneral";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Dashboard } from "./Dashboard";
import Notification from "./Notification";
import { get_allNotis } from "../../apicalls/noti";
const AdminIndex = () => {
  const [activeTabKey, setActiveTabKey] = useState("1");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  //get state from redux
  const [pendingProducts, setPendingProducts] = useState([]);
  const { user } = useSelector((state) => state.reducer.user);
  //   console.log(user);
  // page, perPage
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [notis, setNotis] = useState([]);
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
  const is_Admin = () => {
    if (user.role !== "admin") {
      navigate("/");
    }
  };

  // const [user_status, setUser_status] = useState("");

  const getusers = async () => {
    try {
      const response = await get_users();

      if (response.isSuccess) {
        message.success(response.message);
        setUsers(response.all_users);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };
  const getALLproducts = async (page = 1, perPage = 10) => {
    try {
      const response = await getAll_products(page, perPage);
      setProducts(response.product_Doc);

      if (response.isSuccess) {
        message.success(response.message);
        console.log(response);
        setCurrentPage(response.currentPage);
        setTotalProducts(response.totalProducts);
        setTotalPages(response.totalpages);
        setPendingProducts(response.pendingProducts);
        console.log(response);
      }
    } catch (error) {
      message.error(respone.message);
    }
  };
  useEffect(() => {
    getALLproducts(currentPage, 10);
    is_Admin();
    getNotifications();
    getusers();
  }, [activeTabKey]);
  // console.log(totalProducts);
  const items = [
    {
      key: "1",
      label: "Dashboard",
      children: (
        <Dashboard
          getALLproducts={getALLproducts}
          products={products}
          users={users}
          totalProducts={totalProducts}
          pendingProducts={pendingProducts}
          setActiveTabKey={setActiveTabKey}
        />
      ),
    },
    {
      key: "2",
      label: "Manage Product",
      children: (
        <Products
          products={products}
          getALLproducts={getALLproducts}
          currentPage={currentPage}
          totalProducts={totalProducts}
          totalPages={totalPages}
        />
      ),
    },
    {
      key: "3",
      label: "Manage users",
      children: (
        <ManageUsers users={users} getusers={getusers} setUsers={setUsers} />
      ),
    },
    {
      key: "4",
      label: "Notifiications",
      children: (
        <Notification notis={notis} getNotifications={getNotifications} />
      ),
    },
    {
      key: "5",
      label: "General",
      children: <AdminGeneral />,
    },
  ];
  const onchangeHandler = (key) => {
    setActiveTabKey(key);
  };
  return (
    <section>
      <Tabs
        items={items}
        activeKey={activeTabKey}
        onChange={(key) => onchangeHandler(key)}
        tabPosition="left"
      ></Tabs>
    </section>
  );
};

export default AdminIndex;
