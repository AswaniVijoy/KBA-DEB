import { Router } from "express"
import { Movie } from "../models/moviemodel.js"
import { authenticate } from "../middleware/auth.js"
import { isAdmin } from "../middleware/isAdmin.js"

const admin = Router()


admin.post("/addmovie", authenticate, isAdmin, async (req, res) => {
  try {
    const { MovieName, Genre } = req.body

    const exists = await Movie.findOne({ movie: MovieName })
    if (exists) {
      return res.status(400).json({ msg: "Movie already exists" })
    }

    const movie = new Movie({ movie: MovieName, genre: Genre })
    await movie.save()
    res.status(201).json({ msg: "Movie Added Successfully" })

  } catch (error) {
    res.status(500).json({ msg: "Something went wrong" })
  }
})

export { admin }
