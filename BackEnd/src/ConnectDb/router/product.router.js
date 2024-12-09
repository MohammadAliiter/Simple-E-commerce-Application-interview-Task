
import { Router } from "express";
import { upload } from "../../middleware/multer.middleware.js";
import { CreateProduct, getAllProducts, getDataParticularId, getSingleiddata } from "../controller/Product.controller.js";
const router = Router();


router.post('/createproduct',upload.single('uploadfile'),CreateProduct)
router.get('/getallproducts',getAllProducts)
router.get('/getSingleProduct/:id',getSingleiddata)
 

export default router

