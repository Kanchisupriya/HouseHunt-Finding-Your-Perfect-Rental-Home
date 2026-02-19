const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    propType: String,
    adType: String,
    isAvailable: {
        type: Boolean,
        default: true
    },
    address: String,
    ownerContact: String,
    amount: Number,
    images: [String],
    addInfo: String
});

module.exports = mongoose.model("Property", propertySchema);
