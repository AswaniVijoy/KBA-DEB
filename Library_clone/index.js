import express, { json } from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { router } from './routes/bookroute.js'
import swaggerUi from "swagger-ui-express"
import YAML from "yamljs"

dotenv.config()

const app = express()
app.use(json())

const swaggerDocument = YAML.load("./swagger.yaml")

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use("/", router)

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error(err))

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
  console.log(`Swagger UI at http://localhost:${PORT}/api-docs`)
})
