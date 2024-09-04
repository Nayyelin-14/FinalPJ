import React, { useEffect, useState } from "react";
import { ban_user, get_users, unban_user } from "../../apicalls/AuthAdmin";
import { message } from "antd";
import moment from "moment";

const ManageUsers = ({ users, getusers, setUsers }) => {
  const ban_userHandler = async (user_ID) => {
    try {
      const response = await ban_user(user_ID);
      // console.log(response);
      if (response.isSuccess) {
        message.success(response.message);
        setUsers((prevUsers) =>
          prevUsers.map((prev) =>
            prev._id === user_ID ? { ...prev, status: "Inactive" } : prev
          )
        );
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const unban_userHandler = async (user_ID) => {
    try {
      const response = await unban_user(user_ID);

      if (response.isSuccess) {
        message.success(response.message);
        ///this one is important for state changes
        setUsers((prevUsers) =>
          prevUsers.map((prev) =>
            prev._id === user_ID ? { ...prev, status: "Active" } : prev
          )
        );
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };
  useEffect(() => {
    getusers();
  }, []);
  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-center">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Email
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Role
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Created at
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users && (
              <>
                {users.map((user) => (
                  <tr
                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b "
                    key={user._id}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center"
                    >
                      {user.name}
                    </th>
                    <td className="px-6 py-4 text-center">{user.email}</td>
                    {user.role === "admin" && (
                      <td className="px-6 py-4 text-center">
                        <span className="bg-blue-600 text-white font-medium p-2 rounded-lg">
                          {user.role}
                        </span>
                      </td>
                    )}
                    {user.role === "user" && (
                      <td className="px-6 py-4 text-center">
                        <span className="bg-green-600 text-white font-medium p-2 rounded-lg">
                          {user.role}
                        </span>
                      </td>
                    )}
                    <td className="px-6 py-4 text-center">{user.status}</td>
                    <td className="px-6 py-4 text-center">
                      {moment(user.createdAt).format("L")}
                    </td>
                    <td className="px-6 py-4 text-center flex gap-3">
                      {user.status === "Active" ? (
                        <button
                          type="button"
                          className="font-medium  text-base text-green-700 hover:underline hover:text-green-700 text-center"
                          onClick={() => ban_userHandler(user._id)}
                        >
                          Ban
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="font-medium  text-base text-green-700 hover:underline hover:text-green-700 text-center"
                          onClick={() => unban_userHandler(user._id)}
                        >
                          Unban
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
