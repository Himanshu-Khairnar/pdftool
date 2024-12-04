import ApiError from "../utils/ApiErrors.js"
import ILovePDFApi from "@ilovepdf/ilovepdf-nodejs"
import ApiResponse  from "../utils/ApiResponse.js"
import asyncHandler  from "../utils/asyncHandler.js";


const instance = new ILovePDFApi(process.env.PUBLIC_KEY_ILOVEPDF, process.env.SECRET_KEY_ILOVEPDF);

export const service = asyncHandler(async (req, res) => {
    try {
        const { name } = req.params
        const { file } = req.files
        if (!name)
            throw new ApiError(400, "Please fill all the fields")
        if (!file)
            throw new ApiError(400, "Please upload the file")
        const task = instance.newTask('merge');

        // Promise-based way to use ILovePDFApi.
        await task.start();
        await task.addFile(file.path);
        await task.process();
        const data = await task.download();

        console.log("DONE", data);

        return res.status(200).json(new ApiResponse(200, {name,data}, "User registered successfully",))
    } catch (error) {

        throw new ApiError(500, "Error while registering user")
    }
})