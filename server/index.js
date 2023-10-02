const express = require("express")
const app = express()
const fs = require("fs")
const cors = require("cors")

app.use(cors())
app.use(express.json())


app.use((req,res,next)=>{
    const logdata = `${req.method}"=req method=",${req.url}"=req url="\n`
    fs.appendFile("log.txt",logdata,(err)=>{
        if(err){
             res.json({error : "something wrongS"})
        }else{
            console.log(logdata)
            next()
        }
    })
    
})


const authenticate  =  (req,res,next)=>{
    const authentication = false
    if (authentication === true){
        next()
    }else{
        res.json({error : "Unauthorized"})
    }
}

app.get("/api/data",(req,res)=> {
    res.json({message : "Get Endpoint"})
})

app.post("/api/data",authenticate,(req,res)=> {
    res.json({message : "Post Endpoint"})
})


const PORT = 3000
app.listen(PORT,()=>console.log(`server started in Port ${PORT}`))