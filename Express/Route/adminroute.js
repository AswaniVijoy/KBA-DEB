import { Router } from "express";
import Course from "../Models/coursemodel.js";
import upload from "../Middleware/upload.js"
const admin=Router()
const course=new Map()
const carts =new Map()


admin.post('/addCourse', async (req, res) => {
  try {
    const { CourseName, CourseId, CourseType, Description, Price } = req.body;
    // if (course.get(CourseName)) {
    if (await Course.findOne({ courseName: CourseName })) {
      res.status(400).json({ msg: 'Course already exist' })
    }
    else {
      // course.set(CourseName, { CourseId, CourseType, Description, Price });
      const newCourse = new Course({
        courseName: CourseName,
        courseId: CourseId,
        courseType: CourseType,
        description: Description,
        price: Number(Price)
      });
      await newCourse.save();
      res.status(201).json({ msg: 'Course successfully entered' })

    }
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Something went wrong' })
  }

})


admin.post('/addCourseWithImage', upload.single('CourseImage'),async (req, res) => {
  try {
    const { CourseName, CourseId, CourseType, Description, Price } = req.body;
    // if (course.get(CourseName)) {
    if (await Course.findOne({ courseName: CourseName })) {
      res.status(400).json({ msg: 'Course already exist' })
    }
    else {
          let imageBase64 = null; //is an image format
      if (req.file) {
        imageBase64 = req.file.buffer.toString('base64');
      }
      // course.set(CourseName, { CourseId, CourseType, Description, Price });
      const newCourse = new Course({
        courseName: CourseName,
        courseId: CourseId,
        courseType: CourseType,
        description: Description,
        price: Number(Price),
         image: imageBase64
      });
      await newCourse.save();
      res.status(201).json({ msg: 'Course successfully entered' })

    }
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Something went wrong' })
  }

})


admin.put('/updateCourse', async (req, res) => {
  try {
    const { CourseName, CourseId, CourseType, Description, Price } = req.body;
    // if (course.get(CourseName)) {
    //   course.set(CourseName, { CourseId, CourseType, Description, Price });
    if (await Course.findOne({ courseName: CourseName })) {
      await Course.updateOne({ courseName: CourseName }, {
        courseId: CourseId,
        courseType: CourseType,
        description: Description,
        price: Number(Price)
      });

      res.status(200).json({ msg: "Course details updated succesfully" })
    }
    else {
      res.status(404).json({ msg: "Course not found" })
    }
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Something gone wrong' })
  }
})

admin.patch('/updateCourse1', async (req, res) => {
  try {
    const { CourseName, Price } = req.body;
    // const result = course.get(CourseName);
    const result = await Course.findOne({ courseName: CourseName });
    console.log(result);
    if (result) {
      // course.set(CourseName, { CourseId: result.CourseId, CourseType: result.CourseType, Description: result.Description, Price })
      await Course.updateOne({ courseName: CourseName }, { price: Number(Price) });
      res.status(200).json({ msg: "Course Updated" })
    }
    else {
      res.status(404).json({ msg: "Course doesnt exist" })
    }
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Something went wrong" })
  }
})


admin.delete('/deleteCourse', async (req, res) => {
  try {
    const { CourseName } = req.body;
    // if (course.get(CourseName)) {
    //   course.delete(CourseName)
    if (await Course.findOne({ courseName: CourseName })) {
      await Course.deleteOne({ courseName: CourseName });
      res.status(200).json({ msg: 'Course deleted succesfully' })
    }
    else {
      res.status(404).json({ msg: 'Course not found' })
    }
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Something went wrong' })
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