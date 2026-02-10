import express,{json} from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import { router } from './routes/studentRoute.js';
dotenv.config()

const app = express()
app.use(json())
app.use("/students",router)

app.get('/', (req, res) => {
  res.send('Hello World')
})



const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/studentsdb';

mongoose.connect(mongoUri)
    .then(() => console.log('Connected to MongoDB!'))
    .catch(err => console.error('Could not connect to MongoDB...', err));



const PORT=process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})