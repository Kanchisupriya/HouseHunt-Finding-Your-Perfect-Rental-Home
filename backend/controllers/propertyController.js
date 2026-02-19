const Property = require("../models/Property");

// Create Property (Owner)
const createProperty = async (req, res) => {
  try {
    const property = await Property.create({
      title: req.body.title,
      location: req.body.location,
      price: req.body.price,
      description: req.body.description,
      ownerId: req.user.id,
      images: req.file ? [req.file.filename] : []
    });

    res.status(201).json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get All Properties (Renter)
const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find({ isAvailable: true });
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Owner Properties
const getOwnerProperties = async (req, res) => {
  try {
    const properties = await Property.find({ ownerId: req.user.id });
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Property
const deleteProperty = async (req, res) => {
  try {
    await Property.findByIdAndDelete(req.params.id);
    res.json("Property Deleted");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProperty,
  getAllProperties,
  getOwnerProperties,
  deleteProperty
};
