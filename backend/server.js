const express=require("express")
const { message } = require("statuses")
const app=express()

app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(express.urlencoded({extended: true}))
//app.use(express.json)
//app.use(logger)

app.get('/',logger, (req,res)=>{
    // console.log("Hello World!")
    // res.send("Hi") //basically printf
    // res.status(500).send("Internal error") //send error
    // res.status(500).json({message: "Erorr"}) //send json code ie to api
    // res.download("server.js")
    res.render("index.ejs", {text123:"World"})
})

function logger(req,res,next){
    console.log(req.originalUrl)
    next()
}

const userRouter=require("./routes/users")

app.use("/users",userRouter)

app.listen(3000)