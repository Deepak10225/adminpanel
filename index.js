const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");
const app = express();
// const mongoose = require("mongoose");
const port = 3000;

const staticPath = path.join(__dirname, "/assets");
app.use(express.static(staticPath));
require("./db/connection");
const Deepak = require("./models/deepak");
const AddBilling = require("./models/addbilling");
const Item = require("./models/item");
const Client = require("./models/client");
const Combo = require("./models/combo");
app.use(express.urlencoded({ extended: false }));
const ejs = require("ejs");
const { db } = require("./models/client");
const { default: mongoose } = require("mongoose");
// const { Mongoose } = require("mongoose");
app.set("view engine", "ejs");
app.get("/", async (req, res) => {
  page = 1;
  limit = 10;
  const skip = page * limit - limit;
  const data = await Client.find().skip(skip).limit(limit);
  const pages = res.render("login");
});
app.get("/itemMaster", async (req, res) => {
  res.render("itemMaster");
});
app.get("/addorderlist", async (req, res) => {
  res.render("addorderlist");
});
app.post("/itemMaster", (req, res) => {
  const data = new Item(req.body);
  data.save();

  res.render("itemMaster");
});
app.get("/list", async (req, res) => {
  const data = await Client.find();
  res.render("list", { data });
});
var myid;
app.get("/cart/:id", async (req, res) => {
  var id = req.params.id;
  myid = id;
});
app.get("/addcomboo/:id", async (req, res) => {
  var id = req.params.id;
  myid = id;
});
app.get("/updateclient", async (req, res) => {
  // console.log(myid);
  const data = await Client.find({ _id: myid });
  // console.log(data);
  if (data.length !== 0) {
    res.render("updateclient");
  }
});
app.get("/updateorder", async (req, res) => {
  const data = await Client.find();
  // console.log(data);
  const items = await Item.find();
  res.render("updateorder", { data, items });
});
app.get("/updatecombo", (req, res) => {
  res.render("updatecombo");
});

app.post("/updateorder", async (req, res) => {
  const data = new AddBilling(req.body);

  const data1 = await AddBilling.find({ _id: myid });
  if (data1[0]._id == myid) {
    const updatedocument = async (_id) => {
      try {
        const result = await AddBilling.updateOne(
          { _id },
          {
            $set: {
              clientname: data.clientname,
              countries: data.countries,

              discount: data.discount,

              date: data.date,
            },
          }
        );
      } catch (error) {}
    };
    updatedocument(myid);
  }
  res.redirect("/billingproductlist");
});
app.post("/updatecombo", async (req, res) => {
  const data = new Combo(req.body);

  const data1 = await Combo.find({ _id: myid });
  if (data1[0]._id == myid) {
    const updatedocument = async (_id) => {
      try {
        const result = await Combo.updateOne(
          { _id },
          {
            $set: {
              name: data.name,
              fprice: data.fprice,
            },
          }
        );
      } catch (error) {}
    };
    updatedocument(myid);
  }
  res.redirect("/combolist");
});
app.get("/updateitem", (req, res) => {
  res.render("updateitem");
});
app.post("/updateclient", async (req, res) => {
  const data = new Client(req.body);

  const data1 = await Client.find({ _id: myid });
  if (data1[0]._id == myid) {
    const updatedocument = async (_id) => {
      try {
        const result = await Client.updateOne(
          { _id },
          {
            $set: {
              clientname: data.clientname,
              mobile: data.mobile,
              almobile: data.almobile,
              clemail: data.clemail,
            },
          }
        );
      } catch (error) {}
    };
    updatedocument(myid);
  }
  res.redirect("/list");
});
app.post("/updateitem", async (req, res) => {
  const data = new Item(req.body);

  const data1 = await Item.find({ _id: myid });
  console.log(data1);
  if (data1[0]._id == myid) {
    const updatedocument = async (_id) => {
      try {
        const result = await Item.updateOne(
          { _id },
          {
            $set: {
              username: data.username,
              itemType: data.itemType,
              price: data.price,
              desc: data.desc,
            },
          }
        );
      } catch (error) {}
    };
    updatedocument(myid);
  }
  res.redirect("/additemmaster");
});
app.get("/list", (req, res) => {
  res.render("clientMaster");
});
app.get("/addbillingproduct", async (req, res) => {
  const data = await Client.find();
  // console.log(data);
  const items = await Item.find();
  res.render("addbillingproduct", { data, items });
});
app.get("/billingproductlist", async (req, res) => {
  const data = await AddBilling.find();
  res.render("billingproductlist", { data });
});
app.get("/combolist", async (req, res) => {
  const data = await Combo.find();
  res.render("combolist", { data });
});
app.get("/additemmaster", async (req, res) => {
  const items = await Item.find();
  res.render("additemmaster", { items });
});
app.post("/addbillingproduct", async (req, res) => {
  const data1 = new AddBilling(req.body);
  // console.log(data);
  data1.save();
  const data = await Client.find();
  // console.log(data);
  const items = await Item.find();
  res.render("addbillingproduct", { data, items });
});
app.get("/combobuilder", (req, res) => {
  res.render("combobuildder");
});
app.post("/combobuilder", (req, res) => {
  const data = new Combo(req.body);
  data.save();
  res.render("combobuildder");
});
app.get("/clientmaster", (req, res) => {
  res.render("clientMaster");
});
app.get("/addclient", (req, res) => {
  res.render("addclient");
});
app.post("/addclient", (req, res) => {
  const data = new Client(req.body);
  // console.log(name, number, clnumber, clmail);
  data.save();
  res.render("clientMaster");
});
app.post("/", async (req, res) => {
  const email = req.body.email;
  const pass = req.body.pass;
  const matchData = await Deepak.find({ email });
  const data = await Client.find();
  const length = data.length;
  const clients = await Item.find();
  let cl = clients.length;
  // res.render("index", { length, cl });
  // console.log(matchData);
  // console.log(email);
  // console.log(pass);
  if (matchData[0].pass == pass) {
    res.render("index", { length, cl });
  } else {
    res.send("fill correct username  and password");
  }
});
app.get("/home", async (req, res) => {
  const data = await Client.find();
  const length = data.length;
  const clients = await Item.find();
  let cl = clients.length;
  res.render("index", { length, cl });
});
app.get("/cartt/:id", async (req, res) => {
  const id = req.params.id;
  const matchid = await Client.find({ _id: id });
  matchid.forEach((e) => {
    //   console.log(e.id);
    if (e.id == id) {
      e.delete();
    }
  });
});
app.get("/deleteorder/:id", async (req, res) => {
  const id = req.params.id;
  const matchid = await AddBilling.find({ _id: id });
  matchid.forEach((e) => {
    //   console.log(e.id);
    if (e.id == id) {
      e.delete();
    }
  });
});
app.get("/additem/:id", async (req, res) => {
  var id = req.params.id;
  myid = id;
});
app.get("/updateorder/:id", async (req, res) => {
  var id = req.params.id;
  myid = id;
});
app.get("/additemm/:id", async (req, res) => {
  const id = req.params.id;
  const matchid = await Item.find({ _id: id });
  matchid.forEach((e) => {
    //   console.log(e.id);
    if (e.id == id) {
      e.delete();
    }
  });
});
app.get("/addcombo/:id", async (req, res) => {
  const id = req.params.id;
  const matchid = await Combo.find({ _id: id });
  matchid.forEach((e) => {
    //   console.log(e.id);
    if (e.id == id) {
      e.delete();
    }
  });
});
app.listen(port, (req, res) => {
  console.log("Connected...");
});
