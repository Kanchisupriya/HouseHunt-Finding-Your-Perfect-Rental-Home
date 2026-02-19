const Booking = require("../models/Booking");
const Property = require("../models/Property");

// Renter books property
const createBooking = async (req, res) => {
  try {
    const property = await Property.findById(req.params.propertyId);

    if (!property) return res.status(404).json("Property not found");

    if (!property.isAvailable)
      return res.status(400).json("Property already booked");

    const booking = await Booking.create({
      propertyId: property._id,
      renterId: req.user.id
    });

    property.isAvailable = false;
    await property.save();

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// Owner dashboard bookings
const getOwnerBookings = async (req, res) => {
  try {
    const properties = await Property.find({ ownerId: req.user.id });

    const propertyIds = properties.map(p => p._id);

    const bookings = await Booking.find({
      propertyId: { $in: propertyIds }
    })
    .populate("propertyId")
    .populate("renterId", "name email");

    res.json(bookings);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// Renter dashboard bookings
const getRenterBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      renterId: req.user.id
    }).populate("propertyId");

    res.json(bookings);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
// Owner approves booking
const approveBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("propertyId");

    if (!booking) return res.status(404).json("Booking not found");

    booking.status = "approved";
    await booking.save();

    res.json("Booking Approved");
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// Owner rejects booking
const rejectBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("propertyId");

    if (!booking) return res.status(404).json("Booking not found");

    booking.status = "rejected";

    // Make property available again
    booking.propertyId.isAvailable = true;
    await booking.propertyId.save();

    await booking.save();

    res.json("Booking Rejected");
  } catch (error) {
    res.status(500).json(error.message);
  }
};


module.exports = {
  createBooking,
  getOwnerBookings,
  getRenterBookings,
  approveBooking,
  rejectBooking
};
