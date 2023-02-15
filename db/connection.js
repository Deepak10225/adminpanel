const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(
    "mongodb+srv://iam000:iam000@cluster0.dih35we.mongodb.net/?retryWrites=true&w=majority"
  );
  console.log("DB Connected..");

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
