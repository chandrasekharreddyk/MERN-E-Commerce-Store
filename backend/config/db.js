import mongoose from "mongoose";
import { ensureSeedData } from "../utils/ensureSeedData.js";

const connectDB = async () => {
  try {
    // Prefer the Docker URI if present, otherwise fall back to normal
    const uri = process.env.MONGO_URI;

    console.log("Connecting to MongoDB with URI:", uri);

    await mongoose.connect(uri, {
      // options if your project uses them, e.g.:
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });

    console.log("MongoDB connected");
    // Auto-seed only if DB is empty
    await ensureSeedData();
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
