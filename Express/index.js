import express,{json} from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import {router} from './Route/userroute.js'
import { admin } from './Route/adminroute.js';
import { authenticate } from './Middleware/auth.js';
import { admincheck } from './Middleware/admin.js';
import { user } from './Route/courseroute.js';
dotenv.config()

const app=express();
app.use(json())
app.use("/user",router)
app.use("/admin",authenticate,admincheck,admin)
app.use("/",user)


const mongodbURI = process.env.MONGODB_URI ||'mongodb://127.0.0.1:27017/studentsdb';
mongoose.connect(mongodbURI).then(() => {
    console.log("MongoDB connected")
}).catch((err) => {
    console.log("MongoDB connection error:", err)
})

app.listen(process.env.port,()=>{
    console.log(`Server is running at ${process.env.port}`);
    
});

app.get("/", (req, res) => {
    res.send(`
        <h1 style="color: #691515; font-family: sans-serif; text-align: center; margin-top: 50px; background-color: #7487a5;">
            Server is running at port ${process.env.port}

        </h1>
    `);
}); 

app.get("/homepage",(req,res)=>{
    res.send("Welcome to homepage")
    console.log("Welcome to homepage");
    
})

app.get("/aboutus",(req,res)=>{
    res.send("Welcome to aboutpage")
})

app.get("/contactus",(req,res)=>{
    res.send("Welcome to contactpage")
})

app.get("/login",(req,res)=>{
    res.send("Welcome to loginpage")
})