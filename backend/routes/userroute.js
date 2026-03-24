import { Router } from "express"
import { Review } from "../models/reviewmodel.js"
import { Movie } from "../models/moviemodel.js"
import { authenticate } from "../middleware/auth.js"

const user = Router()

user.post("/addreview", authenticate, async (req, res) => {
  try {

    if (req.user.role === "admin") {
      return res.status(403).json({ msg: "Admin cannot add review" })
    }

    const { Film, Comment, Rating } = req.body

    const movieExists = await Movie.findOne({ movie: Film })
    if (!movieExists) {
      return res.status(400).json({ msg: "Movie Not Found" })
    }

    const review = new Review({
      film: Film,
      comment: Comment,
      rating: Rating
    })

    await review.save()

    res.status(201).json({ msg: "Review Added Successfully" })

  } catch (error) {
    res.status(500).json({ msg: "Something went wrong" })
  }
})

user.put("/updatereview/:id", async (req, res) => {
  try {
    const updated = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json({ msg: "Updated", updated })
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong" })
  }
})


user.get("/showreview", async (req, res) => {
  try {
    const reviews = await Review.find()
    res.status(200).json(reviews)
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong" })
  }
})


user.delete("/deletereview/:id", async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id)
    res.status(200).json({ msg: "Deleted" })
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong" })
  }
})


user.get("/showmovie", async (req, res) => {
  try {
    const movies = await Movie.find()
    res.status(200).json(movies)
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong" })
  }
})

export { user }
