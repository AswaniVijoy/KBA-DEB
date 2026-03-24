import { model, Schema } from "mongoose"

const reviewschema = new Schema({
  film: String,
  comment: String,
  rating: String
})

const Review = model("Review", reviewschema)
export { Review }
