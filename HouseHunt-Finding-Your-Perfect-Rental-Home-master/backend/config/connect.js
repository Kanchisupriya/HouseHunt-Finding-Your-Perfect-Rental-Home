const mongoose = require('mongoose');

const connectionOfDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ Connected to MongoDB');

    // Sample schema and model (adjust fields as per your data)
    const userSchema = new mongoose.Schema({
      name: String,
      email: String,
    });

    const User = mongoose.model('User', userSchema);

    // Fetch and print one document from the 'users' collection
    const user = await User.find();

    if (user) {
      console.log('📄 Found user:', user);
    } else {
      console.log('❗ No user found in the "users" collection.');
    }

  } catch (err) {
    throw new Error(❌ Could not connect to MongoDB: ${err});
  }
};

module.exports = connectionOfDb;