const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// Defining our User Schema
const UserSchema = new mongoose.Schema({
uname:{type:String,required:true,unique:true},
email:{type:String,required:true,unique:true},
password:{type:String,required:true},
role:{type:String,required:true,enum:["user","admin","manager","employee"],default:"user"},
mobile_no:{type:String,required:true,unique:true}
},{
    timestamps:true // this will automatically create createdAt and updatedAt fields
});

//implementing password encryption
UserSchema.pre('save',async function(){
    if(this.isModified("password")){
        const hashedPass = await bcrypt.hash(this.password,12);
        this.password = hashedPass;
    }
});
const User = mongoose.model("User",UserSchema);

module.exports = User;