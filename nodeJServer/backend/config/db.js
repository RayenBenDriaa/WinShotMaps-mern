const mongoose = require("mongoose");
const url = "mongodb://127.0.0.1:27017/Destinations_on_maps";
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(url, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log(`mongodb connected ${conn.connection.host} `);
  } catch (error) {
    console.error(`Error:${error.message}`);
    process.exit();
  }
};
module.exports = connectDB;
