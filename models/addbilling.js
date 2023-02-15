const mongoose = require("mongoose");

const clientSchema = mongoose.Schema({
  clientname: String,
  countries: String,
  addmore: String,
  discount: String,
  date: String,
});
const AddBilling = mongoose.model("AddBilling", clientSchema);
module.exports = AddBilling;
