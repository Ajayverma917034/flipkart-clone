import ErrorHandler from "../utils/errorHandler.js";
import jwt from 'jsonwebtoken';
import tryCatch from "./utils/tryCatch.js"
import { sendToken } from "../utils/jwtToken.js";
import sendEmail from "../utils/sendEmail.js"
import User from "../models/UserModel.js";
import cloudinary from 'cloudinary'

export const registerUser = tryCatch(async (req, res, next) => {
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale",
    });

    const { name, email, password } = req.body;
    const user = await User.create({
        name, email, password,
        avatar: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        },
    })

    const { _id: id } = user;
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
    sendToken(user, 201, res)
})

export const loginUser = tryCatch(async (req, res, next) => {
    const { email, password } = req.body;

    // checking if user has given password and email both

    if (!email || !password) {
        return next(new ErrorHandler("Please Enter Email & Password", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }
    sendToken(user, 200, res);
})

export const logOut = tryCatch(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({ success: true, message: "Logged Out" })
})

export const forgotPassword = tryCatch(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        return next(new ErrorHandler("User not found", 404))

    }
    // get reset password token
    const resetToken = await user.getResetPassToken();

    await user.save({ validateBeforeSave: false })

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`

    const message = `Your password reset Token is :- \n\n ${resetPasswordUrl} \n\n If you have not requested this email then, please ignore it`;
    try {
        await sendEmail({
            email: user.email,
            subject: `Ecommerce password Recovery`,
            message,
        })
        res.status(200).json({ success: true, message: `Email sent to ${user.email} successfully` })
    } catch (err) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false })
        return next(new ErrorHandler(err.message, 500))

    }
})

// get user details

export const getUserDetails = tryCatch(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({ success: true, user })
})

// change password

export const updatePassword = tryCatch(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Old password is incorrect", 400));

    }
    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password does not match", 400));

    }
    user.password = req.body.newPassword;
    await user.save();
    sendToken(user, 200, res);
})


//update profile of user

export const updateProfile = tryCatch(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    };

    if (req.body.avatar !== "" && req.body.avatar !== 'undefined') {
        const user = await User.findById(req.user.id);

        const imageId = user.avatar.public_id;

        await cloudinary.v2.uploader.destroy(imageId);

        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: "avatars",
            width: 150,
            crop: "scale",
        });

        newUserData.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        };
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    console.log("Done")

    res.status(200).json({
        success: true,
    });
});

// to get single user (admin)

export const getSingleUser = tryCatch(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return next(new ErrorHandler(`User does not exist with Id ${req.params.id}`))
    }
    res.status(200).json({ success: true, user })
})

// to get all users (admin)

export const getAllUsers = tryCatch(async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({ success: true, users })
})

// update user role -- Admin    


export const updateUserRole = tryCatch(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
    }
    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({ success: true })
})

// delete user -- Admin


export const deleteUser = tryCatch(async (req, res, next) => {

    const user = await User.findById(req.params.id)
    if (!user) {
        return next(new ErrorHandler(`User does not exist with Id : ${req.params.id}`))
    }
    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);
    await User.deleteOne(user);
    res.status(200).json({ success: true, message: "User deleted successfully" })
})

