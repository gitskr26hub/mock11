const express=require("express")

var cors = require('cors')
const app=express()



app.use(express.json())
app.use(cors())

const {connection}=require("./db")
const { UserModel }=require("./USER.modal")


app.get("/",(req,res)=>{
res.send("welcome to mock 15")
})



app.post("/signup",async(req,res)=>{
    const {email,password,name}=req.body
    try{
       
            const user=new UserModel({email,password,name})
            await user.save()
            res.json({"msg":"Signup successfull"})
    }
    catch(err){
        console.log(err)
        res.json({msg:"something wrong"})
    }
    
})

app.post("/login",async(req,res)=>{
    const {email,password}=req.body
    console.log(email,password)
    try{
        const user=await UserModel.find({email})
    
        //console.log(user[0].email,user[0].password)

        if(user.length>0&&user[0].email===email&&user[0].password===password ){
                    
            res.send(user)
                
        }
        else{
            res.send("login fail")
        }
    }
    catch(err){
        console.log(err)
        res.json({msg:"something went wrong ,try again later"})
    }
})





app.listen(8080,async()=>{

    try{
        await connection
        console.log("Port start at 8080")
    }
    catch(err){
        console.log("err in mongo connect to DB")
        console.log(err)
    }

})
