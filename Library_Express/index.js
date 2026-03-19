import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
const app=express();

app.listen(process.env.Port,()=>{
    console.log(`Server is running at port ${process.env.Port}`);
    
});