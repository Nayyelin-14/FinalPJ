import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BookmarkIcon, UserIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { PowerIcon } from "@heroicons/react/24/outline";
import { setUser } from "../store/slices/UserSlice";
import { message } from "antd";
const Nav = () => {
  //to get a state data from redux store
  const { user } = useSelector((state) => state.reducer);
  // console.log(user.user.role);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = () => {
    dispatch(setUser(null));
    localStorage.removeItem("token");
    navigate("/");
    message.success("Logout successfully");
  };
  return (
    <nav className="flex items-center justify-between  text-blue-500 p-4  ">
      <Link to={"/"} className="font-bold text-3xl">
        NEXT.IO
      </Link>
      <div className="flex items-center gap-4">
        <Link to={"/about"}>About</Link>
        <Link to={"/contact"}>Contact</Link>
        <Link to={"/qanda"}>Q&A</Link>
      </div>
      {user?.user !== null && (
        <div className="flex">
          {user.user.role === "user" && (
            <Link to={"/profile"} className="px-2 py-1 flex items-end gap-1">
              <UserIcon width={25} />
            </Link>
          )}
          {user.user.role === "admin" && (
            <Link to={"/admin"} className="px-2 py-1 flex items-end gap-1">
              <UserIcon width={25} />
            </Link>
          )}
          <Link
            to={"/saved-products"}
            className="px-2 py-1 flex items-end gap-1"
          >
            <BookmarkIcon width={25} />
          </Link>

          <PowerIcon
            width={25}
            className="text-red-600 ml-2 cursor-pointer"
            onClick={logout}
          />
        </div>
      )}
      {user?.user === null && (
        <div className=" flex items-center gap-3 text-base">
          <Link to={"/login"}>Login</Link>
          <Link to={"/register"}>Register</Link>
        </div>
      )}
    </nav>
  );
};

export default Nav;
