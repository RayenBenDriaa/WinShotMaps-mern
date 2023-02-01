const express = require("express");
const router = express.Router();

const {
  getPath,
  getPatheById,
  CreatePath,
  DeletePath,
  UpdatePath,
} = require("../controllers/pathController");
router.route("/").post(CreatePath);
router.route("/:id").get(getPatheById).delete(DeletePath);
router.route("/user/:id").get(getPath);

module.exports = router;
