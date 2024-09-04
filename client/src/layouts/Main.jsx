import React from "react";
import Nav from "../Components/Nav";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <div className="max-w-[90%] mx-auto">
      <Nav />
      <Outlet />
    </div>
  );
};

export default Main;
