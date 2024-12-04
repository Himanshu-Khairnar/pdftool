import { Router } from "express";
import { service } from '../controllers/pdf.controller.js'
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router()
router.use(verifyJWT)
router.post('/service/:name', verifyJWT, upload.single('file'), service);


export default router