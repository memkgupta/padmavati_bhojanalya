const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name:{type:String,required:true},
    category:{type:mongoose.Schema.Types.ObjectId,ref:'Category'},
    price:{type:Number,required:true},
    isAvailaible:{type:boolean},
    images:[
        {imgLink:{type:String},desc:{type:String}}
    ]

});

const Items = mongoose.model('Items',itemSchema);

module.exports=Items;