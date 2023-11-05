const mongoose = require('mongoose');
const tableSchema = new mongoose.Schema({
    tableNo:{type:Number,unique:true,required:true},
    capacity:{type:Number,default:4,required:true},
    status:{type:String,required:true,enum:["vacant","reserved"],default:"vacant"},

});
const Table = mongoose.model('Table',tableSchema);
module.exports=Table;