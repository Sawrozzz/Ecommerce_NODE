const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");

module.exports.registerUser = async function (req, res) {
  try {
    let { email, fullname, password } = req.body;

    let user = await userModel.findOne({ email: email });
    if (user) return res.status(401).send("User already exists");

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        if (err) res.send(err.message);
        else {
          let user = await userModel.create({
            email,
            fullname,
            password: hash,
          });
          let token = generateToken(user);
          res.cookie("token", token);
          res.send("User registered successfully");
        }
      });
    });
  } catch (err) {
    res.send(err.message);
  }
};

module.exports.loginUser = async function (req, res) {
  let { email, password } = req.body;

  let user = await userModel.findOne({ email: email });
  if (!user) {
    req.flash("error", "User does not exist");
    return res.redirect("/");
  }

  bcrypt.compare(password, user.password, function (err, result) {
    if (result) {
      let token = generateToken(user);
      res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      res.redirect("/shop");
    } else {
      res.status(401).send("Email or password is incorrect");
    }
  });
};

module.exports.logoutUser = function (req, res) {
  res.clearCookie("token", {
    path: "/",
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
  res.redirect("/");
};
