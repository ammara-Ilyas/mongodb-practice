const mongoose = require("mongoose");

const url = "mongodb://127.0.0.1:27017/shop";

mongoose.connect(url);

// need to create schema
const productSchema = new mongoose.Schema({
  id: Number,
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String,
  rating: {
    rate: Number,
    count: Number,
  },
});

// need to create modal
const product = new mongoose.model("Product", productSchema);

const main = async () => {
  try {
    const data = await product.find({ price: { $gte: 20 } });
  } catch (error) {
    console.log(error);
  }
};

main();
