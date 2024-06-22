const mongoose = require("mongoose");

const ownerSchema = mongoose.Schema({
  email: String,
  fullname: {
    type: String,
    minLength: 3,
    trim: true,
  },
  password: String,
  products: {
    type: Array,
    default: [],
  },
  picture: String,
  gstin: String,
});

module.exports = mongoose.model("owner", ownerSchema);
