const express = require("express")

const cors = require("cors")
require('dotenv').config()
const {connection} = require("./config/db")
const {UserModel} = require("./models/User.model")

const app = express();

app.use(express.json())
app.use(cors({origin : "*"}))

app.get("/", (req, res) => {
    res.send("Welcome to this api for sign up and login(signin) ")
})


app.post("/signup", async (req, res) => {
    console.log("req.body",req.body)
    const {email, password} = req.body;

    console.log("req email",email,"req password",password)

    const userPresent = await UserModel.findOne({email})
    
    if(userPresent?.email){
        res.send("User already exist, Please go to Sign in page")
    }
    else{
        try{    const user = new UserModel({email,password})
                await user.save()
                res.send("Sign up successfull")
                    }
       catch(err){
            console.log(err)
            res.send("Something went wrong, please try again later")
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
        console.log("Connected to MongoDB Successfully")
    }
    catch(err){
        console.log("Error with mongoDB")
        console.log(err)
    }
    console.log("Listening on PORT 7000")
})

