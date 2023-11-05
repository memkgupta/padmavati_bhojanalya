const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    uid:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    gatewaySpecific:{type:mongoose.Schema.Types.Mixed}, // as the data is not predefined
    amount:{type:Number,required:true}
},{timestamps:true});

const Payment = mongoose.model('Payment',paymentSchema);
module.exports=Payment;