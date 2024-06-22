const jwt = require("jsonwebtoken");

const generateToken = (user)=>{
    return jwt.sign({ email:user.email, id: user._id }, process.env.JWT_SECRET); // put your secret key in .env file

};
module.exports.generateToken = generateToken;