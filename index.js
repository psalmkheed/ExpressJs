require("./config/db.js");
const express = require('express');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT;

// routes
const userRoutes = require('./routes/userRoutes');
const studentRoutes = require('./routes/studentRoutes');
const productRoutes = require('./routes/productRoutes');

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
