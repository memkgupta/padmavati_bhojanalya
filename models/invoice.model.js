const mongoose = require('mongoose');
const invoiceSchema = new mongoose.Schema({
    items:[
        {itemId:{type:mongoose.Schema.Types.ObjectId,ref:'Items'},qty:{type:Number,default:1,required:true},amount:{type:Number}}
    ],
    mobile:{type:String,required:true},
    email:{type:String},
    totalAmount:{type:Number,required:true},
    tax:{type:Number},
    totalPayable:{type:Number,required:true},
    
},{timestamps:true});

const Invoice = mongoose.model('Invoice',invoiceSchema);