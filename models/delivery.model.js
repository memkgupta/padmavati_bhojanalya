const mongoose = require('mongoose');
const deliverySchema = new mongoose.Schema({
    orderRef:{type:mongoose.Schema.Types.ObjectId,ref:'OnlineOrder'},
    deliveryBoy:{type:mongoose.Schema.Types.ObjectId,ref:'Employee'},
    status:{type:String,enum:["Out For Delivery","Canceled","Delivered"]},
    address:{type:String,required:true}
});
const Delivery = mongoose.model('Delivery',deliverySchema);
module.exports=Delivery;