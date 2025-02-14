import User from "../models/Usermodel.js"
import bcryptjs from "bcryptjs"
import { createToken } from "../utils/createToken.js"
import catchAsyncError from "../middleware/catchAsyncError.js"
import ErrorHandler from "../utils/errorHandler.js"

export const signUp = catchAsyncError(async (req, res, next) => {
    const { username, email, password } = req.body

    if (!username || !email || !password || username === "" || email === "" || password === "") {
        return next(new ErrorHandler("All fields are required", 400));
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return next(new ErrorHandler("Email already exists", 400));
    }

    const hashedPassword = bcryptjs.hashSync(password, 10)

    const newUser = new User({
        username,
        email,
        password: hashedPassword,
    })

    try {
        await newUser.save()
        res.json("Sign Up successfully")
    } catch (error) {
        next(error)
    }
})

export const signIn = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password || email === "" || password === "") {
        return next(new ErrorHandler("Email or password is required", 400)); 
    }

    try {
        const validUser = await User.findOne({ email });

        if (!validUser) {
            return next(new ErrorHandler("Invalid Email or Password", 404)); 
        }

        const validPassword = bcryptjs.compareSync(password, validUser.password);

        if (!validPassword) {
            return next(new ErrorHandler("Invalid Email or Password", 404)); 
        }

        const token = createToken(validUser.email, validUser._id, validUser.role);

        const { password: pass, ...rest } = validUser._doc;

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000
        });

        res.status(200).json({ token, user: rest });

    } catch (error) {
        next(error);
    }
})


export const signOut = async (req, res, next) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
        });

        return res.status(200).json({ message: "User signed out successfully." });
    } catch (error) {
        next(error);
    }
};


export const getUserDetails = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return next(new ErrorHandler("User not found", 404)); 
        }
        const { password, ...rest } = user._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};


export const getAllUsers = catchAsyncError(async (req, res, next) => {
    const users = await User.find();

    if (users.length === 0) {
        return next(new ErrorHandler("No User Found", 400)); 
    }

    const usersWithoutPassword = users.map(({ _doc: { password, ...rest } }) => rest);

    res.status(200).json({
        success: true,
        users: usersWithoutPassword
    });
});

export const getSingleUser = async (req, res, next) => {
    const user = await User.findById(req.params.userId);

    if (!user) {
        return next(new ErrorHandler(`User does not Exist with this ID: ${req.params.userId}`, 404)); 
    }

    const { password, ...rest } = user._doc;

    res.status(200).json({
        success: true,
        user: rest
    });
};

export const updateUser = catchAsyncError(async (req, res, next) => {
    const { username, email, role } = req.body;
    const userId = req.params.userId;

    const user = await User.findById(userId);

    if (!user) {
        return next(new ErrorHandler(`User not found with ID: ${userId}`, 404));
    }

    if (username) user.username = username;
    if (email) user.email = email;
    if (role) user.role = role;

    await user.save();

    res.status(200).json({
        success: true,
        message: "User details updated successfully",
        user
    });
});


export const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.userId);

        if (!user) {
            return next(new ErrorHandler(`No User exists with this ID: ${req.params.userId}`, 404)); // Fix: message first, status code second
        }

        res.status(200).json("User deleted successfully");
    } catch (error) {
        next(error);
    }
};
