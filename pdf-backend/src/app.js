import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express()
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))
app.use(express.json({limit:"16kb"}))
app.use(cookieParser()) 
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true, limit: '16kb' }))


import userRouter from './routes/user.routes.js'
import pdfRouter from './routes/pdf.routes.js'
import historyRouter from './routes/history.routes.js'

app.use("/api/v1/users", userRouter)
app.use("/api/v1/pdf", pdfRouter)
app.use("/api/v1/history", historyRouter)

export default app