import { Router } from "express";
import { regsiterUser, loginUser, logoutUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router =Router()
 

router.route("/register").post(regsiterUser)
router.route("/login").post(loginUser)
router.route("/logout").use(verifyJWT).get(logoutUser)
router.route("/refresh").use(verifyJWT).post(RefreshToken)
export default router
