import { Router } from "express";
import { registerUser, loginUser, logoutUser, RefreshToken } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router =Router()
 

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.get("/logout", verifyJWT, logoutUser);
router.route("/refresh").post(RefreshToken)
export default router
