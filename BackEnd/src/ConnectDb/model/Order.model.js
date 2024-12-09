import mongoose from "mongoose";
import { Schema } from "mongoose";


const orderSChema = new Schema({
     userId : {
         type: mongoose.Schema.Types.ObjectId ,
          ref:'user'
     },
     productdetails: {
         type: mongoose.Schema.Types.ObjectId,
          ref:'Product'
     }
},{timestamps:true})

export const order = mongoose.model('order',orderSChema);