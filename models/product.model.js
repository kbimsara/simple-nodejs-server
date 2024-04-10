const mongoose=require('mongoose');

const ProductSchema=mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,"Please Enter Name Field!!"]
        }
    }
);

const Product=mongoose.model("Product",ProductSchema);
module.exports=Product;