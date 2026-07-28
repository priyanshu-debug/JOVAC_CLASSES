const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/basic_db')
  .then(() => console.log("Database Connected!"))
  .catch((err) => console.log("DB Error:", err));

app.use('/auth', require('./routes/authRoutes'));
app.use('/product', require('./routes/productRoutes'));

app.listen(5000, () => console.log("Server running on port 5000"));