const express = require("express");
const router = express.Router();
const protect = require("../middleware/authmidleware");
const {
  registerUser,
  authUser,
  DeleteUser,
  UpdateUser,
  getUserById,
} = require("../controllers/userControllers");
router.route("/").post(registerUser);
router.route("/login").post(authUser);
router.route("/:id").get(getUserById).delete(DeleteUser);
router.route("/profile").post(protect, UpdateUser);
module.exports = router;
