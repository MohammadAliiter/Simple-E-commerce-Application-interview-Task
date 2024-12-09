import { Product } from "../model/productdata.model.js";
 import { uploadOnCloudinary } from "../../utils/cloudinary.js";
import fs from "fs";
import mongoose from "mongoose";
import { validateHeaderValue } from "http";

export const CreateProduct = async (req, res) => {
  try {
    const {
      productname,
      productdescription,
      productprice,
      productrating,
      sizeoptions, // This will come as a JSON string
    } = req.body;

    // Validate required fields
    if (!productname || !productdescription || !productprice || !productrating || !sizeoptions) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    // Check if an image file is provided
    if (!req.file?.path) {
      return res.status(400).json({
        message: "Product image is required",
        success: false,
      });
    }

    // Parse sizeoptions to an array of objects
    let parsedSizeOptions;
    try {
      parsedSizeOptions = JSON.parse(sizeoptions); // Convert JSON string to an array of objects
    } catch (error) {
      return res.status(400).json({
        message: "Invalid sizeoptions format. It must be a valid JSON array.",
        success: false,
      });
    }

    
    const uploadedImage = await uploadOnCloudinary(req.file.path);

    
    fs.unlinkSync(req.file.path);

   
    const product = new Product({
      productname,
      productdescription,
      productprice,
      productrating,
      sizeoptions: parsedSizeOptions, 
      imagelink: uploadedImage.secure_url,
    });

    await product.save();

    return res.status(201).json({
      message: "Product created successfully",
      success: true,
      product,
    });
  } catch (error) {
    console.error("Error in createProduct:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};


export const getAllProducts = async(req,res)=>{
    try {
         const allProduct = await Product.find();
         if(!allProduct){
              return res.status(404).json({
                messege:"data not found"
              })
         }

         return res.status(201).json({
            messege:"all product fetched successfully",
            success:true,
            allProduct:allProduct
         })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            success: false,
          });
    }
}


export const getSingleiddata = async (req, res) => {
    try {
      const { id } = req.params;
  
      
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          message: "Invalid ID format",
          success: false,
        });
      }
  
      
      const findData = await Product.findById(id);
  
      if (!findData) {
        return res.status(404).json({
          message: "Data not found",
          success: false,
        });
      }
  
      
      return res.status(200).json({
        message: "Data fetched successfully",
        success: true,
        findData,
      });
    } catch (error) {
      console.error("Error fetching data by ID:", error);
      return res.status(500).json({
        message: "Internal server error",
        success: false,
      });
    }
  };

 export const getDataParticularId = async(req,res)=>{
      try {
          const{id} = req.params;

           if(!mongoose.Types.ObjectId.isValid(id)){
                return res.status(400).json({
                     messege:"id is inValid",
                     success:false
                })
           }

           const deletData = await Product.deleteOne({id});
           return res.status(201).json({
            messege:"data deleted successfully",
            deletData:deletData
           })
      } catch (error) {
        
      }
 }


 