require("./config/db.js");
const express = require('express');
const cors = require("cors");
const path = require("path");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const authenticate = require("./auth/protectedRoute");

app.use(cors());

const PORT = process.env.PORT || 5000;

// routes
const userRoutes = require('./routes/userRoutes');
const studentRoutes = require('./routes/studentRoutes');
const productRoutes = require('./routes/productRoutes');

app.use(express.static(path.join(__dirname, "public")));

app.get("/login", (req, res) => {
      res.sendFile(path.join(__dirname, "public", "login.html"));
});
app.get("/register", (req, res) => {
      res.sendFile(path.join(__dirname, "public", "register.html"));
});
app.get("/dashboard", (req, res) => {
      res.sendFile(path.join(__dirname, "public", "dashboard.html"));
});
app.get("/dashboard/products", (req, res) => {
      res.sendFile(path.join(__dirname, "public", "admin", "products.html"));
});

app.use('/api/users', userRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/products', productRoutes);

app.listen(PORT, ()=>{
      console.log(`Server running on http://localhost:${PORT}`)
});
