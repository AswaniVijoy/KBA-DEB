import { Router } from "express";
import Book from "../models/book.js";

const router=Router()

router.post('/', async (req, res) => {
    try {
        const newBook = new Book({
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            publishedYear:req.body.publishedYear,
            availability:req.body.availability
        });
        await newBook.save();
        res.status(201).json(newBook);
    } catch (error) {
        console.error('Error Adding Book:', error);
        res.status(400).json({ error: 'Bad Request' });
    }
});

router.get("/",async (req,res)=>{
    console.log('alerted');
    
     try {
        const students = await Book.find();
        res.json(students);
    } catch (error) {
        console.error('Error fetching students:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.put("/:id", async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ msg: "Book not found" });
    }

    res.json(updatedBook);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);

    if (!deletedBook) {
      return res.status(404).json({ msg: "Book not found" });
    }

    res.json({ msg: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


export {router}