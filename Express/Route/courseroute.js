import { Router } from "express";
import { course } from "./adminroute.js";


const user=Router();

user.get("/getAllCourse",(req,res)=>{
    try{
        res.status(200).json(Object.fromEntries(course))
    }
    catch{
        res.status(500).json("Internal Server Error")

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
//using CourseType

user.get("/getCourseByType",(req,res)=>{
    try{
            console.log(req.query);
            const result=course.get(CourseName);
            const check=result.courseType
            const key=req.query.check;

        try{
            const type=course.get(key);
            console.log(type);          
           
            res.status(200).json(type)
           
        }
        catch{
                res.status(400).json({msg:"Something Went Wrong"})

        } 
        
    }
    catch{
                res.status(500).json({msg:"Internal Servor Error"})

    }
})

//using params

user.get("/getCourseByName/:name",(req,res)=>{
    try{
        console.log(req.params);

        const key=req.params.name;

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

export {user}