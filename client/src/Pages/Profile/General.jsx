import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../store/slices/UserSlice";
import { useNavigate } from "react-router-dom";

const General = () => {
  const { user } = useSelector((state) => state.reducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.log(user.user.email);
  const logouthandler = () => {
    localStorage.removeItem("token");
    dispatch(setUser(null));
    navigate("/");
  };
  return (
    <section className="w-full mx-auto mt-10 ">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold my-2">Profile</h1>
        <button
          className="border bg-red-600 p-2 font-semibold text-white rounded-lg "
          type="button"
          onClick={() => logouthandler()}
        >
          Log out
        </button>
      </div>
      <div className="w-1/2 mx-auto">
        <div className="flex items-center justify-between mt-2">
          <p>Email</p>
          <p className="text-base font-medium mb-1"> {user.user.email}</p>
        </div>
        <div className="flex items-center justify-between mt-2">
          <p>Name</p>
          <p className="text-base font-medium mb-1">{user.user.name}</p>
        </div>
        <div className="flex items-center justify-between  mt-2  ">
          <p>Role</p>
          <p className="text-base font-medium mb-1 bg-green-500 p-1 rounded-lg text-white">
            {user.user.role}
          </p>
        </div>
      </div>
    </section>
  );
};

export default General;
