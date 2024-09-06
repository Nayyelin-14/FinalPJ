const { response } = require("express");
const Notification = require("../models/notifications");
exports.pushNotifications = async (req, res) => {
  const { title, message, owner_id, product_id, phone_number } = req.body;

  try {
    const reponseNoti = await Notification.create({
      title,
      message,
      owner_id,
      product_id,
      phone_number,
    });

    if (!reponseNoti) {
      throw new Error("can't push noti");
    }
    return res.status(201).json({
      isSuccess: true,
      message: "Commented successfully",
      reponseNoti,
    });
  } catch (error) {
    return res.status(500).json({
      isSuccess: false,
      message: error.message,
    });
  }
};

exports.getNotifications = async (req, res) => {
  try {
    const notiDocs = await Notification.find({ owner_id: req.userID }).sort({
      createdAt: -1,
    });
    // console.log("noti", notiDocs);
    if (!notiDocs) {
      throw new Error("Unauthorized user");
    }
    return res.status(201).json({
      isSuccess: true,
      message: "Notifications are fetched",
      notiDocs,
    });
  } catch (error) {
    return res.status(500).json({
      isSuccess: false,
      message: error.message,
    });
  }
};

exports.markasRead = async (req, res) => {
  const { noti_id } = req.params;

  try {
    const NotiRead_Docs = await Notification.findById(noti_id);
    if (!NotiRead_Docs || NotiRead_Docs.length === 0) {
      throw new Error("There is no notification");
    }

    NotiRead_Docs.isRead = "true";
    NotiRead_Docs.save();

    return res.status(201).json({
      isSuccess: true,
      message: "Notification is marked as read",
      NotiRead_Docs,
    });
  } catch (error) {
    return res.status(500).json({
      isSuccess: false,
      message: error.message,
    });
  }
};

exports.deleteSingleNoti = async (req, res) => {
  const { notiId } = req.params;

  try {
    const NotiRead_Docs = await Notification.findByIdAndDelete(notiId);
    if (!NotiRead_Docs || NotiRead_Docs.length === 0) {
      throw new Error("There is no notification");
    }

    return res.status(201).json({
      isSuccess: true,
      message: "Notification is deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      isSuccess: false,
      message: error.message,
    });
  }
};
