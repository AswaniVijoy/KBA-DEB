import express, { json } from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { router } from './routes/bookroute.js'

dotenv.config()

const app = express()
app.use(json())
app.use("/",router)

const mongoUri = process.env.MONGODB_URI ;
console.log(mongoUri);

mongoose.connect(mongoUri)
    .then(() => console.log('Connected to MongoDB!'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})