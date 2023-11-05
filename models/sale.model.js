const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
    orderRef:{type:mongoose.Schema.Types.ObjectId,required:true}, // no ref as it can refer to any of the order 
    mobile:{type:String,required:true},
    ivoiceRef:{type:mongoose.Schema.Types.ObjectId,ref:'Invoice',required:true},
    type:{type:String,enum:["online","offline"]},

},{timestamps:true});
const Sale=  mongoose.model('Sale',saleSchema);

module.exports= Sale;