const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    type: {
        type: String,
        enum: ["renter", "owner", "admin"],
        default: "renter"
    },
    isApproved: {
        type: Boolean,
        default: false
    },
    role: {
  type: String,
  enum: ["owner", "renter", "admin"],
  default: "renter"
}

});

module.exports = mongoose.model("User", userSchema);
