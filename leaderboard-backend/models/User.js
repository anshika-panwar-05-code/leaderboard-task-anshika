const mongoose= require('mongoose');
const userSchema= new mongoose.Schema({
    name:{type:String,required:true,unique:true},
    totalPoints:{type:Number,default:0}
},{timestamps:true});

module.exports= mongoose.model('User',userSchema);