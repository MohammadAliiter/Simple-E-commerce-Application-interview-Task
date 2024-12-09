import { Router } from "express";
import { addCartData } from "../controller/Cart.controller.js";
import { jwtAuth } from "../../middleware/auth.middleware.js";
const router = Router();


router.get('/addcart/:id',jwtAuth,addCartData)
 


export default router

