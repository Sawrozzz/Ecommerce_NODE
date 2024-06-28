const express = require("express");

const router = express.Router();
router.get("/", function (req, res) {
  res.send("Products route");
});
router.get("/create", function (req, res) {
  res.render("createproducts");
});

module.exports = router;
