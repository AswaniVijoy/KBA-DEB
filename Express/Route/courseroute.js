import { Router } from "express";
import Course from "../Models/coursemodel.js";
import sharp from "sharp";

const user=Router();

user.get("/getAllCourse", async (req, res) => {
    try {
        const allCourses = await Course.find();
        res.status(200).json(allCourses);
        //   res.status(200).json(Object.fromEntries(course))

    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server error" })
    }
})

user.get('/getCourseImage', async (req, res) => {
    try {
        const CourseName = req.query.CourseName;
        if (!CourseName) {
            return res.status(400).json({
                msg: "CourseName query parameter required"
            });
        }

        const result = await Course.findOne({ courseName: CourseName });
        if (!result) {
            return res.status(404).json({
                msg: "Course not found"
            });
        }

        if (!result.image) {
            return res.status(404).json({
                msg: "Image not found for this course"
            });
        }

        const imageBuffer = Buffer.from(result.image, "base64");
        const compressedImage = await sharp(imageBuffer).resize({ width: 300 }).jpeg({ quality: 70 }).toBuffer();
        res.set({
            "Content-Type": "image/png",        
        });

        res.send(compressedImage);
        // res.status(200).json({ result })

    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server error" })
    }
})
//using query
user.get("/getCourseByName",(req,res)=>{
    try{
        console.log(req.query);

        const key=req.query.CourseName;

        try{
            const result=course.get(key);
            if(result){
                res.status(200).json(result)
            }
            else{
                res.status(400).json({msg:"Course Not Found"})
            }
        }
        catch{
                res.status(400).json({msg:"Something Went Wrong"})
        }        
    }
    catch{
                res.status(500).json({msg:"Internal Servor Error"})

    }
})

user.get('/getCourseByName', async (req, res) => {
    try {
        // console.log("course");
        console.log(req.query);
        const data = req.query;
        console.log(data.CourseName);
        const CourseName = req.query.CourseName;
        // const key = req.query.CourseName;

        if (!CourseName) {
            return res.status(400).json({
                msg: "CourseName query parameter required"
            });
        }


        // const result = course.get(key);
        const result = await course.findOne({ courseName: CourseName });
        // console.log(result);
        if (result) {
            res.status(200).json({ result })
        }
        else {
            res.status(404).json({ msg: "Course not found" })
        }
        // console.log(result);
    }

    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server error" })
    }
})
//using CourseType

user.get('/getCourse/:name', async (req, res) => {
    try {
        // console.log("course");
        console.log(req.params);
        const data = req.params.name;
        console.log(data);

        const courseName = req.params.name;
        // const key = req.params.name;

        // const result = course.get(key);
        const result = await Course.findOne({ courseName: courseName });
        if (result) {
            res.status(200).json({ result })
        }
        else {
            res.status(404).json({ msg: "Course not found" })
        }


    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server error" })
    }
})
//using params

user.get('/getCourse/:name', async (req, res) => {
    try {
        // console.log("course");
        console.log(req.params);
        const data = req.params.name;
        console.log(data);

        const courseName = req.params.name;
        // const key = req.params.name;

        // const result = course.get(key);
        const result = await course.findOne({ courseName: courseName });
        if (result) {
            res.status(200).json({ result })
        }
        else {
            res.status(404).json({ msg: "Course not found" })
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server error" })
    }
})

export {user}