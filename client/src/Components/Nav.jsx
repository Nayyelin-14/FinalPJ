import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserIcon } from "@heroicons/react/24/solid";
import { useSelector } from "react-redux";
const Nav = () => {
  //to get a state data from redux store
  const { userId } = useSelector((state) => state.reducer.user);
  console.log(userId);
  return (
    <nav className="bg-blue-500 flex items-center justify-between  text-white p-4  ">
      <Link to={"/"} className="font-bold text-3xl">
        NEXT.IO
      </Link>
      {userId?.userId !== null && (
        <Link to={"/profile"} className="px-2 py-1 flex items-end gap-1">
          <UserIcon width={25} />
          Profile
        </Link>
      )}
      {userId?.userId === null && (
        <div className=" flex items-center gap-3 text-base">
          <Link to={"/login"}>Login</Link>
          <Link to={"/register"}>Register</Link>
        </div>
      )}
    </nav>
  );
};

export default Nav;
