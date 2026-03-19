import express,{ json }  from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import { router } from './routes/issuecertificateroute.js';
import { certificate } from './routes/viewcertificateroute.js';
dotenv.config()

const app=express();
app.use(json())
app.use("/",router)
app.use("/",certificate)
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/certificatedb';

mongoose.connect(mongoUri)
    .then(() => console.log('Connected to MongoDB!'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const PORT=process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Server is running at port ${PORT}`);
    
})


