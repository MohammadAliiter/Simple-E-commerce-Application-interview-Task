import { Router } from "express";
import { logoutUser, signin, signup } from "../controller/Auth.controller.js";
const router = Router();


router.post('/signup',signup)
router.post('/signin',signin)
router.get('/logout',logoutUser)


export default router

