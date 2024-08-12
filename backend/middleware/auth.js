const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {
    console.log("reqheader ", req.headers);
    const LoginToken = req.headers.authorization; // success yin   //create token if login success
    // const JWT_token = jwt.sign({ userId: Loginuser._id }, process.env.JWT_KEY, {
    //   expiresIn: "1d",
    // }); controller mhr token create htr tr nk tu tu pl
    console.log("login token", LoginToken);
    if (!LoginToken) {
      throw new Error("Unauthorized Login");
    }

    const testLoginToken = jwt.verify(LoginToken, process.env.JWT_KEY);
    console.log("user", testLoginToken);
    req.userID = testLoginToken.userId;
    console.log(req.userID);
    console.log(req);
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
