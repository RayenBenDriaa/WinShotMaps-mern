const express = require("express");
const app = express();
var cors = require('cors')
const notes = require("./data/notes");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const pathRoutes = require("./routes/pathRoutes");
const path=require("path");
const uri = process.env.MONGODB_URI;
dotenv.config();
connectDB();
app.use(express.json());
app.use(cors());
/*app.get("/", (req, res) => {
  res.send("API is running..");
});*/
app.get("/api/notes", (req, res) => {
  res.json(notes);
});
app.get("/api/notes/:id", (req, res) => {
  const note = notes.find((n) => n._id === req.params.id);
  res.send(note);
});

//------deployment---//
 __dirname = path.resolve();


  app.use(express.static(path.join(__dirname, "../destinations-on-map/build")));

  app.get("/", (req, res) =>
    res.sendFile(path.resolve(__dirname, "destinations-on-map", "build", "index.html"))
  );


//-----
app.use("/api/users", userRoutes);
app.use("/api/paths", pathRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server Started on Port ${PORT}`));
