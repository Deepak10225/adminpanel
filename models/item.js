const mongoose = require("mongoose");
const itemSchema = mongoose.Schema({
  username: String,
  img: String,
  itemType: String,
  //   sale: String,
  price: String,
  desc: String,
});
const Item = mongoose.model("Item", itemSchema);
module.exports = Item;
