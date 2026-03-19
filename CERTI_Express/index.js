import express, { json } from "express"
import dotenv from "dotenv"
import { route } from "./Route/userroute.js"
import { admin } from "./Route/adminroute.js"
dotenv.config()

const app=express()
app.use(json())
app.use("/user",route)
app.use("/admin",admin)

app.listen(process.env.port,()=>{
    console.log(`server running at ${process.env.port}`);
    
})