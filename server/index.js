import express from 'express'
import connectDB from './lib/connectDB.js'
import jobRoute from './routes/jobRoute.js'
import userRoute from './routes/userRoute.js'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import path from "path"


dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
const __dirname = path.resolve()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/api/auth',userRoute)
app.use('/api/job',jobRoute)

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"/client/dist")))

    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"client","dist","index.html"))
    })
}

app.listen(PORT,()=>{
    console.log(`💻 Server is running on http://localhost:${PORT}/`)
    connectDB()
})