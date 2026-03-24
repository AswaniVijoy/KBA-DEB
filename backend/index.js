import express, { json } from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { admin } from './routes/adminroute.js'
import { user } from './routes/userroute.js'
import { auth } from './routes/authroute.js'
import cors from 'cors'

dotenv.config()

const app = express()
app.use(json())
app.use(cors())

app.use("/auth", auth)    
app.use("/admin", admin) 
app.use("/user", user)    

mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/moviedb")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err))

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running on port 3000")
})
