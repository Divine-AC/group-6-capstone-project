import dotenv from "dotenv";
import mongoose from "mongoose";
import readline from "readline";
import User from "../models/User.js";
import connectDB from "../config/db.js";

dotenv.config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const ask = (question) =>
  new Promise((resolve) => {
    rl.question(question, resolve);
  });

const createAdmin = async () => {
  try {
    await connectDB();

    const firstName = await ask("First name: ");
    const lastName = await ask("Last name: ");
    const email = await ask("Email: ");
    const password = await ask("Password: ");

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      console.log("A user with this email already exists.");
      return;
    }

    const admin = await User.create({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: normalizedEmail,
      password,
      role: "admin",
    });

    console.log(`Admin created successfully: ${admin.email}`);
  } catch (error) {
    console.error("Failed to create admin:", error.message);
  } finally {
    rl.close();
    await mongoose.connection.close();
  }
};

createAdmin();
