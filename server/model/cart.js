const mongoose=require('mongoose');
var Cart=mongoose.model('Cart',{
    product:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    }
    
},'Cart')
module.exports={Cart};