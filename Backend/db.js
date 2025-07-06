const mongoose = require('mongoose');

// Replace with your actual MongoDB connection string
const mongoURL = "mongodb://127.0.0.1:27017/inotebook";

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURL); // No options needed for Mongoose 7+
    console.log("✅ Connected to MongoDB successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1);
  }
};

module.exports = connectToMongo;












