const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
exports.register = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // console.log("Validation Errors:", errors.array());
    return res.status(400).json({
      isSuccess: false,
      message: errors.array()[0].msg,
    });
  }

  const { name, email, password } = req.body;

  try {
    //check user email already exist?
    const userDoc = await User.findOne({ email: email });
    if (userDoc) {
      throw new Error("User already exist");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //salt: This is the salt generated in the previous step. Adding a salt to the hashing process ensures that even if two users have the same password, their hashed passwords will be different due to the unique salts.

    await User.create({
      email: email,
      name: name,
      password: hashedPassword,
    });
    return res.status(201).json({
      isSuccess: true,
      message: "User created successfully",
    });
  } catch (err) {
    return res.status(409).json({
      isSuccess: false,
      message: err.message,
    });
  }
};

//for login
exports.login = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      isSuccess: false,
      message: errors.array()[0].msg,
    });
  }
  const { email, password } = req.body;
  try {
    const Loginuser = await User.findOne({ email: email });

    if (!Loginuser) {
      throw new Error("Email not found");
    }
    //check password
    const isMatch = await bcrypt.compare(password, Loginuser.password);

    if (!isMatch) {
      throw new Error("Invalid password");
    }

    //check user's status
    if (Loginuser.status === "Inactive") {
      throw new Error("This account was banned!!!");
    }

    //create and set token too that login access if login success
    const JWT_token = jwt.sign({ userId: Loginuser._id }, process.env.JWT_KEY, {
      expiresIn: "1d",
    });

    return res.status(200).json({
      isSuccess: true,
      message: "Successfully Logged In",
      token: JWT_token,
    });
  } catch (err) {
    return res.status(401).json({
      isSuccess: false,
      message: err.message,
    });
  }
};

exports.checkLoginUser = async (req, res, next) => {
  try {
    //middleware a loke loke yin req htl ko userID htae pyy lik mhr
    const userLogin = await User.findById(req.userID).select("name email role");
    // console.log(userLogin);
    if (!userLogin) {
      res.redirect("/");
      throw new Error("Unauthorized user");
    }
    return res.status(200).json({
      isSuccess: true,
      message: "Authorized User",
      LoginUser: userLogin,
    });
  } catch (error) {
    return res.status(401).json({
      isSuccess: false,
      message: err.message,
    });
  }
};
