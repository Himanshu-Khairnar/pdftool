import { Router } from "express";
import { getHistory } from "../controllers/history.controller.js";
const router = Router()

router.use(verifyJWT)
router.route("/").get(getHistory)

export default router