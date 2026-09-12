import { User } from "../models/userModel.js";
import catchAsyncError from "./catchAsyncErrors.js";
import ErrorHandler from "./errorMiddlewares.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = catchAsyncError(async (req,res,next) => {
     const {token} = req.cookies;

     if(!token){
        return next(new ErrorHandler("User is not Authenticated.",401));
     }
     const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

     

     req.user = await User.findById(decoded.id).select("-verificationCodeExpire -resetPasswordExpire -resetPasswordToken")

     if(!req.user){
        return next(new ErrorHandler("User not found.",404));
     }

     next();
     
})

export const isAuthorized = (...roles) => {
   return (req, res, next) => {
      if(!roles.includes(req.user.role)){
         return next(new ErrorHandler(`user with this role (${req.user.role}) not allowed too access this resource.`,400))
      }
      next();
   }
}