import { Router } from "express";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from "../Models/userModel.js";
const router=Router()

router.get("/homepage",(req,res)=>{
    res.send("Welcome to homepage")
})

router.get("/aboutus",(req,res)=>{
    res.send("Welcome to aboutpage")
})

router.get("/contactus",(req,res)=>{
    res.send("Welcome to contactpage")
})

router.get("/login",(req,res)=>{
    res.send("Welcome to loginpage")
})

// router.post("/signup",(req,res)=>{


//     try{
//          const {username,password,emailid}=req.body

//          if (!username || !password || !emailid) {
//             return res.status(400).send("All fields are required")
//         }
          

//     console.log(username);
//     console.log(password);
//     console.log(emailid);
//     res.status(201).send("Succesfully signedup")
//     }
//    catch{
//     res.send(error)
//    }
    
    
// })

router.post("/signup",async(req,res)=>{
    try{
         const {FirstName,LastName,Password,UserName,UserRole}=req.body

         if (!FirstName || !LastName || !Password || !UserName || !UserRole) {
            return res.status(400).send("All fields are required")
        }
          
    console.log(FirstName);
    console.log(LastName);
    console.log(Password);    
    console.log(UserName);
    console.log(UserRole);


    try{
        const newPassword=await bcrypt.hash(Password,10)
        console.log(newPassword);
        
        // const result=user.get(UserName)
        const result = await User.findOne({ userName: UserName })
        if(result){
            res.status(400).json({msg:"User already exists"})
        }
        else{
            // user.set(UserName,{FirstName,LastName,newPassword,UserRole})
             const newUser = new User({
                    firstName: FirstName,
                    lastName: LastName,
                    userName: UserName,
                    password: newPassword,
                    userRole: UserRole
                });
                await newUser.save();
            res.status(201).json({msg:"User Created"})

        }
    }
    catch{
        res.send("Something went wrong")
    }
    }
catch  {
    res.send(error)
  }
    
})




// router.post("/login",(req,res)=>{
//     try{
//         const {username,password}=req.body
//          if (!username || !password) {
//             return res.status(400).send("Username and password are required")
//         }

//         console.log(username);
//         console.log(password);

//         res.status(201).send("Login successful")      
        

//     }
//     catch(error){
//         res.send(error)
//     }
// })


// router.post("/login",async(req,res)=>{
  
    
//         const {UserName,Password}=req.body
//          if (!UserName || !Password) {
//             return res.status(400).send("Username and password are required")
//         }

//         console.log(UserName);
//         console.log(Password);

        
//             const result = user.get(UserName)
//             if(!result){
//                 res.status(404).json({msg:"User not found"})
//             }
//             const valid=await bcrypt.compare(Password, result.newPassword)
//             console.log(valid);
//             // res.status(200).json({msg:"SignedUp succesfully"})

//             if(valid){
//             res.status(200).json({msg:"SignedUp succesfully"})
//             }
//             else{
//             res.status(400).json({msg:"Incorrect Password"})

//             }

            
        

            
            
        
        

//     }
   
// )

// router.post("/login",async(req,res)=>{
  
//     const {UserName,Password}=req.body
              
//             // const result = user.get(UserName)
//             const result = await User.findOne({ userName: UserName })
//             if(!result){
//                 res.status(404).json({msg:"User not found"})
//             }
//             const valid=await bcrypt.compare(Password, result.password)
//             console.log(valid);

//             if(valid){
//                 const token =jwt.sign({UserName,UserRole:result.userRole},process.env.SECRET_KEY,{expiresIn:"1h"})
//                 console.log(token);
//                 if(token){
//                     res.cookie('authToken',token,{
//                         httpOnly:true
//                     })
//                 res.status(200).json({msg:"Login success"})

//                 }
//                  else{
//            res.status(500).json({msg:"Something went wrong while generating token"})

//             }
               
//             }
//             else{
//            res.status(400).json({msg:"Incorrect Password"})

//             }
              
           
//   })

  router.post('/login', async (req, res) => {
    try {
        const { UserName, Password } = req.body

        // const result = user.get(UserName)
        const result = await User.findOne({ userName: UserName })
        if (!result) {
            res.status(404).json({ msg: 'UserName not registered' })
        }
        const valid = await bcrypt.compare(Password, result.password)
        console.log(valid);

        if (valid) {
            const token = jwt.sign({ UserName, UserRole: result.userRole }, process.env.SECRET_KEY, { expiresIn: '1h' })
            console.log(token);
            if (token) {
                res.cookie('authToken', token, {
                    httpOnly: true
                })
                res.status(200).json({ msg: 'Succesfully loggedin' })
            }
            else {
                res.status(400).json({ msg: 'Something wrong in token generation' })
            }
        } else {
            res.status(401).json({ msg: 'Invalid Password' })
        }
    } catch {
        res.status(500).json({ msg: 'Something went wrong' })
    }

})



export {router}

// export default router