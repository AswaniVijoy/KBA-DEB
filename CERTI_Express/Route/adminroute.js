import { Router } from "express";
const admin=Router()

const certificate=new Map();

admin.post("/issuecertificate",(req,res)=>{
    
        try{
        const {certificateid,selectcourse,candidatename,selectgrade,issuedate}=req.body
        if(certificate.get(certificateid)){
        res.status(400).json({msg:"Certificate Already Exists"});
        }
        else{
            try{
                certificate.set(certificateid,{selectcourse,candidatename,selectgrade,issuedate})
                res.status(200).json({msg:"Certificate Issued"});
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
export {admin,certificate}