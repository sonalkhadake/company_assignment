const express = require("express")
const app = express();
const port = process.env.port || 5000
const mongoose = require("mongoose")
const cors = require("cors")
const Path = require("path")
var bodyParser = require('body-parser')

const user = require("./routes/user")
const fileupload = require("./routes/fileUpload")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(Path.resolve(__dirname, "public")));
app.use("/api", user)
app.use("/api", fileupload)


///mongodb connection//////
//Ge5zcjkvEGoWJ0Z8


mongoose.connect("mongodb+srv://sonalikhadake:Ge5zcjkvEGoWJ0Z8@cluster0.grnnzrd.mongodb.net/?retryWrites=true&w=majority").then((data)=>{
    console.log("your database is connected")
}).catch(error=>{
    console.log(error)
})








app.listen(port, ()=>{
    console.log("your server is running at port"+port)
})