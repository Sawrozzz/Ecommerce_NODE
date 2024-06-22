const express = require("express"); 
const router = express.Router();
router.get("/", function (req, res) {
  res.render("index");
});

router.get("/owner-login",function(req,res){
  res.render("owner-login");
});


module.exports = router;
