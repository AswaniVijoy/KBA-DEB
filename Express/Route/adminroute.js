import { Router } from "express";
const admin=Router()
const course=new Map()
const carts =new Map()


admin.post("/addcourse",(req,res)=>{
    try{
        const {CourseName,CourseId,CourseType,Description,Price}=req.body
        if(course.get(CourseName)){
        res.status(400).json({msg:"Course Already Exists"});
        }
        else{
            try{
                course.set(CourseName,{CourseId,CourseType,Description,Price})
                res.status(200).json({msg:"Course Successfully Entered"});
            }
            catch{
                res.status(200).json({msg:"Something went wrong while setting data"});

            }
            

        }
    }
    catch{
        res.status(500).json({msg:"Something went wrong"});
        
    }
})


admin.put("/updateAllCourse",(req,res)=>{
    try{
        const {CourseName,CourseId,CourseType,Description,Price}=req.body
        course.get(CourseName)
        course.set(CourseName,{CourseId,CourseType,Description,Price})
        res.status(200).json({msg:"Course Updated"});
        
    }
    catch{
        res.status(404).json({msg:"Course Not Found"});

    }

})
admin.patch("/updateCourse",(req,res)=>{
    try{
        const {CourseName,Price}=req.body
        const result=course.get(CourseName)
        if(result){
            course.set(CourseName,{CourseId:result.CourseId,CourseType:result.CourseType,Description:result.Description,Price})
            res.status(200).json({msg:"Course Updated"});
        }
        
        
    }
    catch{
        res.status(404).json({msg:"Course Not Found"});

    }

})
admin.delete("/deleteCourse",(req,res)=>{
    try{
        const {CourseName}=req.body
        if(course.get(CourseName)){
            course.delete(CourseName)
            res.status(200).json({msg:"Course Deleted"});
        }
        else{
        res.status(404).json({msg:"Course Not Found"});

        }
        
        
    }
    catch{
        res.status(500).json({msg:"Something went wrong"});

    }

})


admin.post("/addtocart",(req,res)=>{

    try{
    const {CourseName,Price}=req.body
    const UserName=req.name 
    console.log(UserName);
    

    if(!UserName||!CourseName||!Price){
        res.status(400).json({msg:"CourseName and Price are required"})
    }
    if(!carts.has(UserName))
    {
        carts.set(UserName,new Map())
    }

    const UserCart=carts.get(UserName)

    if(UserCart.has(CourseName)){
        const item =UserCart.get(CourseName)
        item.Quantity+=1
        UserCart.set(CourseName,item)
    }
    else{
        UserCart.set(CourseName,{CourseName,Price,Quantity:1})        
    }

    res.status(200).json({msg:"Item Added to cart", cart:Object.fromEntries(UserCart)})   

   
    }
catch{
    res.status(500).json({msg:"Something went wrong"})   
    
}
})
export {admin,course}