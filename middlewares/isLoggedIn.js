const jwt = require("jsonwebtoken");

const userModel = require("../models/user-model");

module.exports.isLoggedIn = async function (req, res, next) {
  if (!req.cookies.token) {
    req.flash("error", "You need to login first");
    return res.redirect("/");
  }

  try {
    let decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
    let user = await userModel
      .findOne({
        email: decoded.email,
      })
      .select("-password"); // i dont need password
    req.user = user;
    next();
  } catch (err) {
    req.flash("error", "Something went wrong");
    req.redirect("/");
  }
};
