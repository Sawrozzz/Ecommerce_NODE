const express = require('express');
const userModel = require('../models/user-model')

const router = express.Router();
router.get("/",function(req,res){
    res.send("Working on users route");
});


module.exports = router;