const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const propertyRoutes = require("./routes/propertyRoutes");
const bookingRoutes = require("./routes/bookingRoutes");


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/properties", propertyRoutes);


mongoose.connect(process.env.MONGO_URL)
.then(()=> console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/property", require("./routes/propertyRoutes"));
app.use("/api/booking", require("./routes/bookingRoutes"));
app.use("/uploads", express.static("uploads"));
app.use("/api/bookings", bookingRoutes);
app.use("/api/admin", require("./routes/adminRoutes"));



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port " + PORT));
