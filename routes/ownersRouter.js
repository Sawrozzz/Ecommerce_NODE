const express = require("express");
const ownerModel = require("../models/owner-model");
const { loginOwner } = require("../controllers/authController");

const router = express.Router();

// console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === "development") {
  router.post("/create", async function (req, res) {
    let owners = await ownerModel.find();
    if (owners.length > 0) {
      return res.status(503).send("You don't have permission to create owner");
    }
    let { fullname, email, password } = req.body;
    try {
      let createdOwner = await ownerModel.create({
        fullname,
        email,
        password,
      });
      res.status(201).send(createdOwner);
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred while creating the owner.");
    }
  });
}

router.post("/login", loginOwner);

router.get("/login", function (req, res) {
  let error = req.flash("error");
  res.render("adminlogin", { error, loggedIn: false });
});

router.get("/createproduct", function (req, res) {
  let success = req.flash("success");
  res.render("createproducts", { success });
});

module.exports = router;
