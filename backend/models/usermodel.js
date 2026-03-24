import { model, Schema } from "mongoose"
import bcrypt from "bcrypt"

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], default: "user" }
})

const User = model("User", userSchema)
export { User }
