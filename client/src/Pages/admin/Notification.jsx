import React, { useEffect } from "react";

import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";
const Notification = ({ notis, getNotifications }) => {
  // console.log(notis);

  return (
    <section>
      <h1>Notifications</h1>
      <div className="mt-10">
        {notis.length === 0 && (
          <p className="text-red-600 font-medium text-2xl text-center">
            No notification yet
          </p>
        )}
        {notis &&
          notis.map((noti) => (
            <div className="bg-white p-4 rounded-lg w-fit">
              <p className="text-white font-medium text-sm bg-blue-600 p-2 w-fit rounded-lg">
                {formatDistanceToNow(new Date(noti.createdAt))} ago
              </p>
              <h4 className="text-2xl my-3 font-semibold text-blue-500">
                {noti.title}
              </h4>{" "}
              <p className="font-bold mb-4">{noti.message}</p>
              <p>
                Contact number -
                <span className="tracking-wide">{noti.phone_number}</span>
              </p>
              <hr className="my-3" />
              <div className="text-right">
                <Link
                  to={`/product/${noti.product_id}`}
                  className="text-blue-500 underline"
                >
                  View bids
                </Link>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default Notification;
