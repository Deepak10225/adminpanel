const mongoose = require("mongoose");

const clientSchema = mongoose.Schema({
  clientname: String,
  mobile: String,
  almobile: String,
  clemail: String,
});
const Client = mongoose.model("Client", clientSchema);
module.exports = Client;
