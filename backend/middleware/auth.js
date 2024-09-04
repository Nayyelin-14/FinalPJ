const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {
    const BearerToken = req.headers["authorization"]; // success yin   //create token if login success
    // const JWT_token = jwt.sign({ userId: Loginuser._id }, process.env.JWT_KEY, {
    //   expiresIn: "1d",
    // }); controller mhr token create htr tr nk tu tu pl

    // console.log("login token", BearerToken);
    const JWT_formatToken = BearerToken.split(" ")[1];
    // console.log("formatted JWT", JWT_formatToken);
    if (!JWT_formatToken) {
      throw new Error("Unauthorized Login");
    }

    const LoginToken = jwt.verify(JWT_formatToken, process.env.JWT_KEY);
    // console.log("user", LoginToken);
    req.userID = LoginToken.userId;
    // console.log(req.userID);
    // console.log(req);
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
