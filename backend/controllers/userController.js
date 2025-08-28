import User from "../models/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

import bcrypt from "bcryptjs";
import generateToken from "../utils/createToken.js";

export const createUser = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    throw new Error("Please fill all the inputs.");
  }

  const userExists = await User.findOne({ email });
  if (userExists)
    return res.status(400).json({ message: "User already exists." });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    generateToken(res, newUser._id);
    await newUser.save();
    return res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    });
  } catch (error) {
    res.status(400);
    throw new Error("Invalid user data.");
  }
});

export const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (isPasswordValid) {
      const cookie = generateToken(res, existingUser._id);
      return res.status(200).json({
        _id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
        isAdmin: existingUser.isAdmin,
      });
    }
  }
  return res.status(401).json({ message: "Invalid email or password." });
});

export const logoutCurrentUser = asyncHandler(async (req, res, next) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
    sameSite: "none",
  });
  return res.status(200).json({ message: "Logout successfully." });
});

export const getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find({});
  res.status(200).json({ users });
});

export const getCurrentUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (user) {
    return res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("User not found.");
  }
});

export const updateCurrentUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      user.password = hashedPassword;
    }
    await user.save();
    return res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("User not found.");
  }
});

export const deleteUserById = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error("Can not delete admin user.");
    }
    await User.deleteOne({ _id: user._id });
    return res.json({ message: "User removed." });
  } else {
    res.status(404);
    return res.json({ message: "User not found." });
  }
});

export const getUserById = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.json(user);
  }
  res.status(404);
  throw new Error("User not found.");
});

export const updateUserById = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin);
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      user.password = hashedPassword;
    }
    await user.save();
    res.json({ user });
  } else {
    res.status(404);
    throw new Error("User not found.");
  }
});
