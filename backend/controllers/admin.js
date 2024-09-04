const Products = require("../models/Products");
const Users = require("../models/users");
exports.get_AllProduct_admin = async (req, res) => {
  //   console.log("mmsp", req.body);
  try {
    const perPage = 10;
    const page = parseInt(req.query.page) || 1;
    const product_Doc = await Products.find()
      .populate("product_seller", "name") //seller a yin htoke , name g pl thk thk htk htokem
      //populate ka table twy chate htr loh 3 tr
      .sort({ createdAt: -1 })
      .skip((page - 1) * perPage)
      .limit(perPage);

    const totalProducts = await Products.find().countDocuments();
    const pendingProducts = await Products.find({
      product_status: "Pending",
    });
    // console.log(pendingProducts);
    const totalpages = Math.ceil(totalProducts / perPage);
    return res.status(200).json({
      isSuccess: true,
      message: "Fetched all products ",
      product_Doc,
      totalProducts,
      totalpages,
      pendingProducts,
      currentPage: page,
    });
  } catch (error) {
    return res.status(422).json({
      isSuccess: false,
      message: error.message,
    });
  }
};

exports.aprroveProduct = async (req, res) => {
  //   console.log("mmsp", req.params);
  const { product_ID } = req.params;
  try {
    const PORDUCT_DOC = await Products.findById(product_ID);

    if (!PORDUCT_DOC) {
      throw new Error("Product not found!!!");
    }

    PORDUCT_DOC.product_status = "approve";
    await PORDUCT_DOC.save();

    return res.status(200).json({
      isSuccess: true,
      message: "Product aprroved",
      PORDUCT_DOC,
    });
  } catch (error) {
    return res.status(422).json({
      isSuccess: false,
      message: error.message,
      PORDUCT_DOC,
    });
  }
};
exports.rejectProduct = async (req, res) => {
  const { product_ID } = req.params;
  try {
    const PORDUCT_DOC = await Products.findById(product_ID);

    if (!PORDUCT_DOC) {
      throw new Error("Product not found!!!");
    }

    PORDUCT_DOC.product_status = "reject";
    await PORDUCT_DOC.save();

    return res.status(200).json({
      isSuccess: true,
      message: "Product rejected",
      PORDUCT_DOC,
    });
  } catch (error) {
    return res.status(422).json({
      isSuccess: false,
      message: error.message,
      PORDUCT_DOC,
    });
  }
};

exports.pendingProduct = async (req, res) => {
  const { product_ID } = req.params;
  try {
    const PORDUCT_DOC = await Products.findById(product_ID);

    if (!PORDUCT_DOC) {
      throw new Error("Product not found!!!");
    }

    PORDUCT_DOC.product_status = "Pending";
    await PORDUCT_DOC.save();

    return res.status(200).json({
      isSuccess: true,
      message: "Product pending",
      PORDUCT_DOC,
    });
  } catch (error) {
    return res.status(422).json({
      isSuccess: false,
      message: error.message,
      PORDUCT_DOC,
    });
  }
};

exports.get_allUsers = async (req, res) => {
  try {
    const all_users_docs = await Users.find()
      .select("name email createdAt status role")
      .sort({ createdAt: -1 });

    if (!all_users_docs) {
      throw new Error("Users not found");
    }
    return res.status(200).json({
      isSuccess: true,
      message: "All users are fetched",
      all_users: all_users_docs,
    });
  } catch (error) {
    return res.status(404).json({
      isSuccess: false,
      message: error.message,
      //       all_users: all_users_docs,
    });
  }
};

exports.ban_user = async (req, res) => {
  const { userId } = req.params;
  try {
    const user_to_ban = await Users.findById(userId).select("status");

    if (!user_to_ban) {
      throw new Error("Product not found!!!");
    }

    user_to_ban.status = "Inactive";
    await user_to_ban.save();

    return res.status(200).json({
      isSuccess: true,
      message: "Banned a user",
      user_to_ban,
    });
  } catch (error) {
    return res.status(422).json({
      isSuccess: false,
      message: error.message,
      user_to_ban,
    });
  }
};

exports.unban_user = async (req, res) => {
  const { userId } = req.params;
  try {
    const user_to_unban = await Users.findById(userId);

    if (!user_to_unban) {
      throw new Error("Product not found!!!");
    }

    user_to_unban.status = "Active";
    await user_to_unban.save();

    return res.status(200).json({
      isSuccess: true,
      message: "Unbanned a user",
      user_to_unban,
    });
  } catch (error) {
    return res.status(422).json({
      isSuccess: false,
      message: error.message,
      user_to_unban,
    });
  }
};
