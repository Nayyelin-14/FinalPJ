const Bids = require("../models/bids");
exports.saveBids = async (req, res) => {
  const { message, phone, Product_ID, Seller_ID, commented_userID } = req.body;
  try {
    if (Seller_ID === commented_userID) {
      throw new Error("Authorization failed");
    }

    const response = await Bids.create({
      product_id: Product_ID,
      seller_id: Seller_ID,
      commented_userID,
      comment_msg: message,
      phone_number: phone,
    });

    return res.status(201).json({
      isSuccess: true,
      message: "Commented successfully",
    });
  } catch (error) {
    return res.status(500).json({
      isSuccess: false,
      message: error.message,
    });
  }
};

exports.get_AllBids = async (req, res) => {
  const { Pid_forbids } = req.params;

  try {
    const bidsDoc = await Bids.find({
      product_id: Pid_forbids,
    })
      .populate("commented_userID", "name")
      .select("comment_msg phone_number createdAt")
      .sort({ createdAt: -1 });

    if (!bidsDoc || bidsDoc.length === 0) {
      throw new Error("No Bids here");
    }

    return res.status(201).json({
      isSuccess: true,
      bidsDoc,
    });
  } catch (error) {
    return res.status(500).json({
      isSuccess: false,
      message: error.message,
    });
  }
};
