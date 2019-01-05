const mongoose=require('mongoose');
var Product=mongoose.model('Product',{
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    }
},'Product')
module.exports={Product};