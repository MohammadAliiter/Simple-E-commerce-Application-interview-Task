 
import express from "express"
import cors from "cors";
 import dotenv from "dotenv"
 import { connectDb } from "./ConnectDb/ConnectDb.js";
 import userRouter from "./ConnectDb/router/router.js"
 import productRouter from "./ConnectDb/router/product.router.js"
 import cartRouter from "./ConnectDb/router/cart.router.js"
 import {v2 as cloudinary} from 'cloudinary';
 import cookieParser from "cookie-parser"
 
const port = process.env.PORT || 5000
const app = express();
  dotenv.config({
     path:"./.env"
  })


  cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key:  process.env.CLOUDINARY_API_KEY,
    api_secret:  process.env.CLOUDINARY_API_SECRET
  });

app.use(express.json());
app.use(express.urlencoded());
app.use(cors())
app.use(cookieParser())

app.use('/api/v1/auth',userRouter);
app.use('/api/v1/product',productRouter);
app.use('/api/v1/cart',cartRouter);
 

connectDb().then(()=>{
    app.listen(port,()=>{
        console.log(`server is running at port ${port}`)
    })
}).catch((error)=>{
    console.log('comming to db connection error',error)
})

 




