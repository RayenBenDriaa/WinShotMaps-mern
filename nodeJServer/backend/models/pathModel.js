const mongoose = require("mongoose");
const pathSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    points: [
      {
        lng: Number,
        lat: Number,
        color: String,
      },
    ],
    distance: {
      type: Number,
    },
    user: {
      type: String,

      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Path = mongoose.model("Path", pathSchema);
module.exports = Path;
