const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");
const User = require("../models/User");
const Property = require("../models/Property");
const Booking = require("../models/Booking");

router.get("/users", protect, admin, async (req, res) => {
  const users = await User.find();
  res.json(users);
});

router.get("/properties", protect, admin, async (req, res) => {
  const properties = await Property.find();
  res.json(properties);
});

router.get("/bookings", protect, admin, async (req, res) => {
  const bookings = await Booking.find()
    .populate("propertyId")
    .populate("renterId");
  res.json(bookings);
});

router.get("/stats", protect, admin, async (req, res) => {
  const bookings = await Booking.find()
    .populate("propertyId");

  const totalBookings = bookings.length;

  const approvedBookings = bookings.filter(
    b => b.status === "approved"
  ).length;

  const revenue = bookings
    .filter(b => b.paymentStatus === "paid")
    .reduce((sum, b) => sum + b.propertyId.price, 0);

  res.json({
    totalBookings,
    approvedBookings,
    revenue
  });
});


module.exports = router;
