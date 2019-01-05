require('./config/config.js')
const {mongoose}=require('./db/mongoose.js');
const {Product}=require('./model/product.js');
const {Cart}=require('./model/cart.js');
const cors=require('cors');

const _=require('lodash');
const {ObjectID}=require("mongodb");
const express=require('express');
const bodyParser=require('body-parser');

var app=express();
var port=process.env.PORT;
app.use(cors());
app.use(bodyParser.json());
app.get("/products",(req,res)=>{
    Product.find().then((todos)=>{
        if(!todos){
            return res.status(404).send();
        }
        res.send({todos});
    }).catch((err)=>{
        res.status(400).send();
    })
})
app.get("/carts",(req,res)=>{
    Cart.find().then((todos)=>{
        if(!todos){
            return res.status(404).send();
        }
        res.send(todos);
    }).catch((err)=>{
        res.status(400).send();
    })
})
app.post('/cart',(req,res)=>{
    var data=_.pick(req.body,['product','price']);
    var cart=new Cart(data)
    cart.save().then((todo)=>{
        res.send({todo});
    },(err)=>{
        res.status(400).send(err);
    })
})

app.delete("/cart/:id",(req,res)=>{
    var id=req.params.id;
    if(!ObjectID.isValid(id))
    {
        return res.status(404).send();
    }
    Cart.findByIdAndRemove(id).then((todo)=>{
        if(!todo){
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((err)=>{
        res.status(400).send();
    })
})


app.listen(port,()=>{
    console.log(`Express started on port ${port}`);
})

module.exports={app};