const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const {
  createBooking,
  getOwnerBookings,
  getRenterBookings
} = require("../controllers/bookingController");

// Renter books property
router.post("/:propertyId", protect, createBooking);

// Owner sees bookings for their properties
router.get("/owner", protect, getOwnerBookings);
router.put("/pay/:id", protect, payForBooking);


// Renter sees their bookings
router.get("/renter", protect, getRenterBookings);
router.put("/approve/:id", protect, approveBooking);
router.put("/reject/:id", protect, rejectBooking);


module.exports = router;
