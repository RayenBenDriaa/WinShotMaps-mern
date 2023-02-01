const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utlis/generateToken");

const registerUser = async (req, res) => {
  const { firstname, email, password, lastname } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(404);
    throw new Error("User already exists");
  }
  const user = await User.create({
    firstname,
    lastname,
    email,
    password,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
};
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      firstname: user.firstname,
      email: user.email,
      lastname: user.lastname,

      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }

  res.json(user);
});

const DeleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: "user Removed" });
  } else {
    res.status(404);
    throw new Error("user not Found");
  }
});
/*const UpdateUser = asyncHandler(async (req, res) => {
  const { firstname, email, password, lastname } = req.body;

  const user = await User.findById(req.params.id);

  if (user) {
    user.firstname = firstname;
    user.email = email;

    user.password = password;
    user.lastname = lastname;

    const updatedUser = await user.save();
    res.json(updatedUser);
  } else {
    res.status(404);
    throw new Error("user not found");
  }
});*/
const UpdateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.firstname = req.body.firstname || user.firstname;
    user.email = req.body.email || user.email;
    user.lastname = req.body.lastname || user.lastname;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      firstname: updatedUser.firstname,
      email: updatedUser.email,
      lastname: updatedUser.lastname,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

module.exports = {
  registerUser,
  authUser,
  getUserById,
  DeleteUser,
  UpdateUser,
};
