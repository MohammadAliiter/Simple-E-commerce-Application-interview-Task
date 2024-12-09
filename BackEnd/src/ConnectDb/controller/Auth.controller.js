import { user } from "../model/user.model.js";
import bcrypt from 'bcrypt';
import { genrateAcessTocken } from "../../utils/genreteAcessTocken.js";

   export const signup = async(req,res)=>{
      try {
          const {email,password} = req.body;
          if(!email || !password){
              return res.status(400).json({
                messege:"fail credentials",
                success:false
              })
          }
        const findEmail = await user.findOne({email});
        if(findEmail){
            return res.status(400).json({
                messege:"this email already exists please enter another email",
                success:false
            })
        }
         
         const hashPassword = await bcrypt.hash(password,10);

        const createUser = new user({
             email,
             password:hashPassword
        })
         
        await createUser.save()

        return res.status(201).json({
            messege:'user Signup Successfully',
            success:true,
            createUser:createUser
        })

      } catch (error) {
          console.log("comming to error in SIgnUp",error)
      }
   }

   export const signin = async(req,res)=>{
      try {
          const {email,password} = req.body;
          if(!email || !password){
            return res.status(400).json({
                messege:"please all field required",
                success:false
            })
          }
       
           const existsUser = await user.findOne({email});

            if(!existsUser){
                 return res.status(404).json({
                    messege:"user not found",
                    success:false
                 })
            }

           const decriptPassword = await bcrypt.compare(password,existsUser.password);

            if(!decriptPassword){
                return res.status(400).json({
                    messege:"please enter right password",
                    success:false
                })
            }
             genrateAcessTocken(existsUser._id,res);
             
              return res.status(201).json({
                messege:"user loogedin successfully",
                logindata:existsUser
              })
      } catch (error) {
          console.log("comming to error in signIn",error);
      }
   }

   export const logoutUser = (req,res)=>{
          try {
             res.cookie("jwt_Tocken","",{maxAge:0})
             return res.status(200).json({messege:"logout successfully"})
          } catch (error) {
              console.log("comming to error in logoutUser",error);
          }
   }