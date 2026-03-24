import { User } from "../models/usermodel.js"
import { Router } from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const auth = Router()

auth.post("/signup", async (req, res) => {
  try {
    const { username, password, role } = req.body

    const exists = await User.findOne({ username })
    if (exists) {
      return res.status(400).json({ msg: "Username already taken" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = new User({ username, password: hashedPassword, role })
    await user.save()

    res.status(201).json({ msg: "Signup successful" })
  } catch (error) {
    console.log("Signup error:", error)
    res.status(500).json({ msg: "Something went wrong" })
  }
})

auth.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body

    const user = await User.findOne({ username })
    if (!user) {
      return res.status(400).json({ msg: "User not found" })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" })
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET
    )

    res.json({
      msg: "Login successful",
      token,
      username: user.username,
      role: user.role
    })

  } catch (error) {
    res.status(500).json({ msg: "Server error" })
  }
})

export { auth }