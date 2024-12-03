import { Router } from "express";
import {service} from '../controllers/pdf.controller.js'
import { upload } from "../middlewares/multer.middleware.js";
const router = Router()

router.route('/service/:name').use(upload.single('file')).post(service)
