import tryCatch from '../controllers/utils/tryCatch.js'
import ErrorHandler from '../utils/errorHandler.js';
import User1 from "../models/UserModel.js"
import jwt from "jsonwebtoken"
export const isAuthentication = tryCatch(async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return next(new ErrorHandler("Please login to this resource", 401));
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User1.findById(decodedData.id)

    next();
})

export const authorizeroles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new ErrorHandler(`Role : ${req.user.role} is not allowed to access this resource`, 403))
        }
        next();
    }
}

