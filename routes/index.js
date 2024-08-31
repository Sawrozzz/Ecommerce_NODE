const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");

router.get("/", function(req, res){
  let error = req.flash("error");
  res.render("home",{error, loggedIn:false})
})

// router.get("/owners/login", function (req, res) {
//   let error = req.flash("error");
//   res.render("adminlogin", { error, loggedIn: false });
// });
router.get("/user/login", function (req, res) {
  let error = req.flash("error");
  res.render("index", { error, loggedIn: false });
});

router.get("/user/profile", isLoggedIn, async function (req, res) {
  let user = await userModel.findOne({ _id: req.user._id });
  if (user) {
    res.render("userProfile", { user });
  } else {
    res.status(404).send("User not found");
  }
});

router.get("/shop", isLoggedIn, async function (req, res) {
  let products = await productModel.find();
  let success = req.flash("success");
  res.render("shop", { products, success });
});

router.get("/addtocart/:productid", isLoggedIn, async function (req, res) {
  let user = await userModel.findOne({ email: req.user.email });
  user.cart.push(req.params.productid);
  await user.save();
  req.flash("success", "Product added to cart");
  res.redirect("/shop");
});

router.get("/cart", isLoggedIn, async function (req, res) {
  let user = await userModel
    .findOne({ email: req.user.email })
    .populate("cart");

  let error = req.flash("error");
  if (user.cart && user.cart.length > 0) {
    const bill =
      Number(user.cart[0].price) + 20 - Number(user.cart[0].discount);
    res.render("cart", { user, bill, error });
  } else {
    req.flash("error", "No products in cart goto Shop to add products");
    res.render("cart", { user, error: req.flash("error") });
  }
});

router.post("/deletecart/:productid", isLoggedIn, async function (req, res) {
  let user = await userModel.findOne({ email: req.user.email });
  user.cart.pull(req.params.productid);
  await user.save();
  res.redirect("/cart");
});

module.exports = router;
