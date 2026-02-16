import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { user as User } from "../model/user.model.js";

export const register = async (req, res) => {
  try {
    const { fullname, email, password, phoneno } = req.body;

    if (!fullname || !email || !password || !phoneno) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = await User.create({
      fullname,
      email,
      phoneno,
      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: createdUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { userid: existingUser._id },
      process.env.JWT,
      { expiresIn: "1d" }
    );

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        success: true,
        message: "Login successful",
        token,
        user: {
          id: existingUser._id,
          fullname: existingUser.fullname,
          email: existingUser.email,
          phoneno: existingUser.phoneno,
        },
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const logout = async (req, res) => {
  return res.status(200).cookie("token", "", { maxAge: 0 }).json({
    success: true,
    message: "Logout successful",
  });
};
