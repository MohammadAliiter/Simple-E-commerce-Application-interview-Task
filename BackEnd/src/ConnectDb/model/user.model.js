import mongoose from "mongoose";
import { Schema } from "mongoose";

const userModel = new Schema({
     email:{
        type:String,
        required:true
     },
     password:{
        type:String,
         required:true
     }
},{timestamps:true})


export const user = mongoose.model('user',userModel);