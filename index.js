const express = require("express")

const cors = require("cors")
require('dotenv').config()
const {connection} = require("./config/db")
const {UserModel} = require("./models/User.model")

const app = express();

app.use(express.json())
app.use(cors({origin : "*"}))

app.get("/", (req, res) => {
    res.send("Welcome ")
})


app.post("/signup", async (req, res) => {
    console.log(req.body)
    const {email, password} = req.body;
    const userPresent = await UserModel.findOne({email})
    
    if(userPresent?.email){
        res.send("Try loggin in, already exist")
    }
    else{
        try{    const user = new UserModel({email,password})
                await user.save()
                res.send("Sign up successfull")
                    }
       catch(err){
            console.log(err)
            res.send("Something went wrong, pls try again later")
       }
    }
    
})

app.get("/signin", async (req, res) => {
    const {email, password} = req.body;
    try{
        const user = await UserModel.find({email})
         
      if(user.length > 0){
        const userpassword = user[0].password;
       
        if(userpassword===password){
           res.send("signin successfull")
        }
        else{
            res.send({msg:"Wrong password"})
        }
       
        console.log("password",userpassword)
           
      } 
      else{
        res.send("Login failed")
      }
    }
    catch{
        res.send("Something went wrong, please try again later")
    }
})

app.listen(7000, async () => {
    try{
        await connection;
        console.log("Connected to DB Successfully")
    }
    catch(err){
        console.log("Error connecting to DB")
        console.log(err)
    }
    console.log("Listening on PORT 7000")
})

