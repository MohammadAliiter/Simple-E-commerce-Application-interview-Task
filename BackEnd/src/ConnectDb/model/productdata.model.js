import mongoose from "mongoose";
import { Schema } from "mongoose";


const ProductSchema = new Schema({
    imagelink:{
        type:String
    },
    productname:{
        type:String,
        required:true
    },
    productdescription: {
        type:String,
        required:true
    },
    productprice: {
        type:String,
        required:true
    },
    productrating: {
        type:Number,
        required:true
    },
    sizeoptions:  [
        {
           size:String,
           quantity: Number,
        }
    ]
},{timestamps:true});

export const Product = mongoose.model('Product',ProductSchema);