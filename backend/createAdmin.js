require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

mongoose.connect(process.env.MONGO_URI);

const createAdmin = async () => {
  try {
    const email = "uniqueengi.global@gmail.com";

    // ✅ Check if this email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log("User with this email already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("Shreyash#94", 10);

    await User.create({
      name: "Shreyash Shelke",
      email: email,
      password: hashedPassword,
      role: "admin",
    });

    console.log("New Admin created successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

createAdmin();