const mongoose = require("mongoose");

require("../db/connection");
const deepakSchema = new mongoose.Schema({
  name: String,
  email: String,
  pass: String,
  // username: String,
  // img: String,
  // price: String,
  // desc: String,
  // clientname: String,
  // mobile: String,
  // almobile: String,
  // clemail: String,
});
const Deepak = mongoose.model("Deepak", deepakSchema);
// const Item = mongoose.model("Item", deepakSchema);
// const Client = mongoose.model("Client", deepakSchema);

module.exports = Deepak;
// module.exports = Item;
// module.exports = Client;
