import { Schema } from "mongoose";
import { model } from "mongoose";

const bookSchema = new Schema({
    title: String,
    author: String,
    price:Number,
    publishedYear:Number,
    availability:String
});

const Book = model('Books', bookSchema);

export default Book;