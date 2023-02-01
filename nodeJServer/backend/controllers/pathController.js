const Path = require("../models/pathModel");
const asyncHandler = require("express-async-handler");

const getPath = asyncHandler(async (req, res) => {
  const paths = await Path.find({ user: req.params.id });
  res.json(paths);
});
const getPatheById = asyncHandler(async (req, res) => {
  const path = await Path.findById(req.params.id);

  if (path) {
    res.json(path);
  } else {
    res.status(404).json({ message: "Path not found" });
  }

  res.json(path);
});

const CreatePath = asyncHandler(async (req, res) => {
  const newPath = new Path({
    user: req.body.user,
    title: req.body.title,
    distance: req.body.distance,
    points: req.body.points,
  });
  console.log(newPath);
  const createdPath = await newPath.save();

  res.status(201).json(createdPath);
});

const DeletePath = asyncHandler(async (req, res) => {
  const path = await Path.findById(req.params.id);

  if (path) {
    await path.remove();
    res.json({ message: "Path Removed" });
  } else {
    res.status(404);
    throw new Error("Path not Found");
  }
});
const UpdatePath = asyncHandler(async (req, res) => {
  const { title, points, distance } = req.body;

  const path = await Path.findById(req.params.id);

  if (path.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (path) {
    path.title = title;
    path.points = points;
    path.distance = distance;

    const updatedPath = await path.save();
    res.json(updatedPath);
  } else {
    res.status(404);
    throw new Error("Path not found");
  }
});

module.exports = { getPath, getPatheById, CreatePath, DeletePath, UpdatePath };
