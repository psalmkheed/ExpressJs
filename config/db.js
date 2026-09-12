require("dotenv").config();
const mongoose = require("mongoose");

async function startServer() {
      await mongoose.connect(process.env.MONGODB_URI)
            .then(() => console.log("Database connected successfully"))
            .catch((error) => console.log("Connection Error ", error));
}

startServer();
module.exports = mongoose;