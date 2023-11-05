const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    tableRef: { type: mongoose.Schema.Types.ObjectId }, // can be null
    Items: [
      {
        itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Items" },
        qty: { type: Number, default: 1, required: true },
        amount: { type: Number },
      },
    ],
    customerName: { type: String },
    mobile: { type: String },
    totalAmount: { type: Number, required: true },
    invoice: { type: mongoose.Schema.Types.ObjectId, ref: "Invoice" },
  },
  { timestamps: true }
);

const orderStatusEnum = [
  "Order Placed",
  "Order Confirmed",
  "Preparing",
  "Out for Delivery",
  "Delivered",
  "Canceled",
  "Delayed",
  "Ready for Pickup",
  "Payment Pending",
  "Refunded",
  "Order Completed",
  "Feedback Requested",
];
const onlineOrderSchema = new mongoose.Schema(
  {
    mobile: { type: String, required: true },
    name: { type: String, required: true },
    paymentRef: { type: mongoose.Schema.Types.ObjectId,ref:'Payment', required: true },
    Items: [
      {
        itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Items" },
        qty: { type: Number, default: 1, required: true },
        amount: { type: Number },
      },
    ],
    uid: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    note: { type: String },
    status: { type: String, enum: orderStatusEnum, default: "Order Placed" },
  },
  { timestamps: true }
);

const OnlineOrder = mongoose.model("OnlineOrder", onlineOrderSchema);
const Order = mongoose.model("Order", orderSchema);
module.exports = { Order, OnlineOrder };
