const mongoose = require("mongoose");
const itemSchema = mongoose.Schema({
  name: String,
  fprice: String,
});
const Combo = mongoose.model("Combo", itemSchema);
module.exports = Combo;
