import React, { useEffect } from "react";

import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";
import { delete_noti, markas_read } from "../../apicalls/noti";
import { message } from "antd";
import { TrashIcon } from "@heroicons/react/24/solid";
const Notification = ({ notis, getNotifications }) => {
  useEffect(() => {
    getNotifications();
  }, []);
  const isReadHandler = async (noti_id) => {
    try {
      const response = await markas_read(noti_id);
      if (response.isSuccess) {
        getNotifications();
        message.success(response.message);
      }
      console.log(response);
    } catch (error) {
      return message.error(response.message);
    }
  };
  const deleteNotihandle = async (deleteNoti_ID) => {
    try {
      const response = await delete_noti(deleteNoti_ID);
      if (response.isSuccess) {
        getNotifications();
        message.success(response.message);
      }
      console.log(response);
    } catch (error) {
      return message.error(response.message);
    }
  };
  return (
    <section>
      <h1>Notifications</h1>
      <div className="flex flex-col xl:flex-row gap-5 my-10 p-1">
        {notis &&
          notis.map((noti) => (
            <div
              className={`${
                noti.isRead ? "bg-gray-200" : "bg-white"
              } p-4 rounded-lg w-fit`}
              key={noti._id}
            >
              <div className="flex items-center justify-between">
                <p
                  className={`${
                    noti.isRead
                      ? "text-gray-500 bg-blue-400"
                      : "bg-blue-600 text-white"
                  } font-medium text-sm  p-2 w-fit rounded-lg`}
                >
                  {formatDistanceToNow(new Date(noti.createdAt))} ago
                </p>
                <div>
                  <TrashIcon
                    width={20}
                    height={20}
                    className="text-red-500 cursor-pointer"
                    onClick={() => deleteNotihandle(noti._id)}
                  />
                </div>
              </div>
              <h4 className="text-2xl my-3 font-semibold text-blue-500">
                {noti.title}
              </h4>{" "}
              <p
                className={`${
                  noti.isRead ? "font-medium mb-4 text-gray-500" : "font-bold "
                }mb-4`}
              >
                {noti.message}
              </p>
              <p>
                Contact number -
                <span className="tracking-wide">{noti.phone_number}</span>
              </p>
              <hr className="my-3" />
              <div className=" flex text-right  gap-2 items-end justify-end">
                <Link
                  to={`/product/${noti.product_id}`}
                  className="text-blue-500 underline"
                >
                  View bids
                </Link>
                {noti.isRead ? (
                  <div></div>
                ) : (
                  <div>
                    <p
                      className="underline  text-blue-500 cursor-pointer hover:text-blue-400"
                      onClick={() => isReadHandler(noti._id)}
                    >
                      Mark as Read
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>
      {notis.length === 0 && (
        <div className="mt-0">
          <p className="text-center text-3xl font-semibold text-red-600">
            No notification here
          </p>
        </div>
      )}
    </section>
  );
};

export default Notification;
