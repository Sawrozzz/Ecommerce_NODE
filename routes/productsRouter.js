const express = require("express");
const router = express.Router();

const upload = require("../config/multer-config");

const productModel = require("../models/product-model");

router.post("/create", upload.single("image"), async function (req, res) {
  try {
    let { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;
    if (!req.file || !req.file.buffer) {
      return res.status(400).send("No file uploaded");
    }
    let product = await productModel.create({
      image: req.file.buffer,
      name,
      discount,
      price,
      bgcolor,
      panelcolor,
      textcolor,
    });
    req.flash("success", "Product created successfully");
    res.redirect("/owners/admin");
  } catch {
    res.send(err.message);
  }
});

module.exports = router;
