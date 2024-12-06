import asyncHandler from "../utils/asyncHandler.js"
import ApiError from "../utils/ApiErrors.js"
import ApiResponse from "../utils/ApiResponse.js"
import file from "../models/file.model.js"
export const gethistory = asyncHandler(async (req, res) => {
    try {
        const history = await file.find({ userId: req.user._id })
        return res.status(200).json(new ApiResponse(200, history, "History fetched successfully"))
    } catch (error) {
        throw new ApiError(500, "Error while fetching history")
    }
})