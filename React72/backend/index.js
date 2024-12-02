const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Schema = mongoose.Schema;
mongoose.connect("mongodb://127.0.0.1:27017/orders");

const ordersSchema = new Schema({
  orderId: Number,
  deliveryDate: Date,
  deliveryAddress: String,
  deliveryFee: Number,
});

const ordersModel = mongoose.model("orders", ordersSchema);

const app = express();
app.use(cors());
app.use(express.json());

app.get("/orders", async (req, res) => {
  var ans = await ordersModel.find();
  res.send(ans);
});

app.get("/orders/:id", async (req, res) => {
  var ans = await ordersModel.findOne({ orderId: req.params.id });
  res.send(req.params.id + " data displayed");
});

app.delete("/orders/:id", async (req, res) => {
  var ans = await ordersModel.deleteOne({ orderId: req.params.id });
  res.send(req.params.id + " cancelled");
});

app.post("/orders", async (req, res) => {
  var instance = new ordersModel(req.body);
  await instance.save();
  res.send("Order Added");
});

app.listen(9000);
