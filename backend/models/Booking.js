const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
    required: true
  },
  renterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  }
}, { timestamps: true });


const payForBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (booking.status !== "approved")
      return res.status(400).json("Booking not approved yet");

    booking.paymentStatus = "paid";
    await booking.save();

    res.json("Payment Successful");
  } catch (error) {
    res.status(500).json(error.message);
  }
};


module.exports = mongoose.model("Booking", bookingSchema);
