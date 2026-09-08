const express = require('express');
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const PORT = 8888;

// routes
const userRoutes = require('./routes/userRoutes');
const studentRoutes = require('./routes/studentRoutes');
const productRoutes = require('./routes/productRoutes');


const compass_string = "mongodb://localhost:27017/cohort8_db";
const atlas_string = "mongodb+srv://blaqdev123_db_user:Codingscience101@cluster0.ynhyyym.mongodb.net/cohort8_db?appName=Cluster0";

// connecting the database to the project
mongoose.connect(atlas_string)
.then(()=>console.log("MongoDb Connected"))
.catch(err=> console.error("Connection Error: ", err))

app.get('/', (req, res)=> {
      try {
            const userName = "Blacco";
res.json({
      message: "I am currently working",
      status: "Success",
      userName
}, 200)
      } catch (error) {
            res.json({
                  message: error.message
            }).status(500)
      }
});

app.use('/api/users', userRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/products', productRoutes);

app.listen(PORT, ()=>{
      console.log(`Server running on http://localhost:${PORT}`)
});
