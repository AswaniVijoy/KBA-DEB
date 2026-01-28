function admincheck(req,res,next){
    if(req.role=='admin'){
        next()
    }
    else{
        res.status(401).json({msg:"Unauthorized Access"})
    }
}

export {admincheck}