const express = require('express');
const router = express.Router();
const { Product } = require('../models/schemas');

router.post('/add', async (req, res) => {
  const newProduct = new Product({
    name: req.body.name,
    cost: req.body.cost,
    category: req.body.category
  });
  await newProduct.save();
  res.send("Product Add Ho Gaya!");
});

router.get('/all', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

router.put('/update/:id', async (req, res) => {
  await Product.findByIdAndUpdate(req.params.id, req.body);
  res.send("Product Update Ho Gaya!");
});

router.delete('/delete/:id', async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.send("Product Delete Ho Gaya!");
});

module.exports = router;