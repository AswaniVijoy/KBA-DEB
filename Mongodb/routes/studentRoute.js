import { Router } from "express";
import Student from '../models/student.js';

const router=Router()

router.get("/",async (req,res)=>{
     try {
        // Fetch students from the database
        const students = await Student.find();
        res.json(students);
        // res.send('Students home page');
    } catch (error) {
        console.error('Error fetching students:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.get('/:name', async (req, res) => {
    try {
        const student = await Student.findOne({ name: req.params.name });
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.json(student);
    } catch (error) {
        console.error('Error fetching student:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.patch('/:name', async (req, res) => {
    try {
        const student = await Student.findOne({ name: req.params.name });
        console.log(student);
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        if (req.body.name !== undefined) student.name = req.body.name;
        if (req.body.age !== undefined) student.age = req.body.age;
        if (req.body.grade !== undefined) student.grade = req.body.grade;
        await student.save();
        res.json(student);
    } catch (error) {
        console.error('Error updating student:', error);
        res.status(400).json({ error: 'Bad Request' });
    }
});

router.delete('/:name', async (req, res) => {
    try {
        const deletedStudent = await Student.findOneAndDelete({ name: req.params.name });
        if (!deletedStudent) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.json({ message: 'Student deleted successfully' });
    } catch (error) {
        console.error('Error deleting student:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/', async (req, res) => {
    try {
        const newStudent = new Student({
            name: req.body.name,
            age: req.body.age,
            grade: req.body.grade
        });
        await newStudent.save();
        res.status(201).json(newStudent);
    } catch (error) {
        console.error('Error creating student:', error);
        res.status(400).json({ error: 'Bad Request' });
    }
});

export {router}