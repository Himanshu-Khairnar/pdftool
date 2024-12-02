import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiErrors.js";
import ApiResponse from "../utils/ApiResponse.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
//for register
const bcryption = (password) => {
    bcrypt.hash(password, 10, (err, hash) => {
        if (err)
            throw new ApiError(500, "Error while hashing password")

        return hash
    })
}

//for login
const checkBcrypt = (password, hash,) => {
    bcrypt.compare(password, hash, (err, result) => {
        if (err)
            throw new ApiError(500, "Error while comparing password")
        return result
    })
}



//for login(access token and refresh token)
const genToken = async ({ userId, userName, email }) => {
    const accessToken = jwt.sign({ userId,userName, email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY })
    const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY })
    await User.findOneAndUpdate({ _id: userId }, { refreshToken })
    return { accessToken, refreshToken }
}



export const regsiterUser = asyncHandler(async (req, res) => {
    try {
        const { userName, email, password } = req.body
        if (!userName || !email || !password)
            throw new ApiError(400, "Please fill all the fields")
        const hashPassword = bcryption(password)
        const check = await User.findOne({ $or: [{ email }, { userName }] })
        if (check)
            throw new ApiError(400, "User already exists")

        const user = await User.create({ name: userName, email, password: hashPassword }).select("-password")
        if (!user)
            throw new ApiError(500, "Error while registering user")

        return res.status(200).json(new ApiResponse(200,user,"User registered successfully",))
    } catch (error) {
        new ApiError(500, "Error while registering user")
    }

});

export const loginUser = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body()
        if (!email || !password)
            throw new ApiError(400, "Please fill all the fields")

        const user = await User.findOne({ $or: [{ email }, { email }] })
        if (!user)
            throw new ApiError(400, "User not found")

        const check = checkBcrypt(password, user.password)
        if (!check)
            throw new ApiError(400, "Incorrect password")

        const { accessToken, refreshToken } = genToken(user)

        const secureOptionns = {
            httpOnly: true,
            secure: true,
        }

        return res.status(200)
            .cookie("refreshToken", refreshToken, secureOptionns)
            .cookie("accessToken", accessToken, secureOptionns)
            .json(new ApiResponse(200, { user, accessToken, refreshToken }, "User logged in successfully"))
    } catch (error) {
        throw new ApiError(500, "Error while logging in user")
    }
});

export const logoutUser = asyncHandler(async (req, res, next) => {
    try {
        const logout = await user.findOneAndUpdate(
            { _id: req.user._id },
            { $unset: { refreshToken: null } }, {
            new: true,
        })
        if (!logout)
            throw new ApiError(500, "Error while logging out user")

        const options = {
            httpOnly: true,
            secure: true,
        }
        return res.status(200)
        .clearCookie("refreshToken",options)
        .clearCookie("accessToken",options)
        .json(new ApiResponse(200, {}, "User logged out successfully"))
    } catch (error) {
        throw new ApiError(500, "Error while logging out user")
    }
})

//Refresh Token Remains