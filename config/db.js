require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.COMPASS_URL)
.then(()=> console.log("Database connected successfully"))
.catch((error)=> console.log("Connection Error ", error))

module.exports = mongoose;