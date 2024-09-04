const User = require("../models/users");
const authMiddleware = async (req, res, next) => {
  try {
    const { userID } = req; //dr ka authmiddleware ka ny lr dk id, d bk ko youk lr tr
    req.admin_ID = userID;
    const admin_Doc = await User.findById(userID).select("role");
    //     console.log("got admin", admin_Doc);
    if (admin_Doc.role !== "admin") {
      throw new Error("Unthorized admin!");
    }

    next();
  } catch (err) {
    return res.status(401).json({
      isSuccess: false,
      message: err.message,
    });
  }
};
//client ka lr tk req ka token ko u

module.exports = authMiddleware;
