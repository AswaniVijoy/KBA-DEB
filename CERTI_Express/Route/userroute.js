import { Router } from "express"
import { certificate } from "./adminroute.js"
const route=Router()

route.get("/homepage",(req,res)=>{
    res.send("Welcome to homepage")
})


route.get("/viewcertificate",(req,res)=>{
    try{
        res.status(200).json(Object.fromEntries(certificate))
    }
    catch{
        res.status(500).json("Internal Server Error")

    }
})
route.get("/viewcertificate/:id", (req, res) => {
  try {
    const id = req.params.id;

    const result = certificate.get(id);

    if (result) {
      res.status(200).json({
        msg: `Certificate with ID ${id} is shown`,result
      });
    } else {
      res.status(404).json({ msg: "Certificate Not Found" });
    }

  } catch {
    res.status(500).json("Internal Server Error");
  }
});


export {route}