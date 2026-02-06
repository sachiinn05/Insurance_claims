require("dotenv").config();
const express=require("express");
const connectDB=require("./config/database")
const cookieParser=require("cookie-parser")
const claimRouter=require("./routes/claim")
const app=express();



app.use(express.json());
app.use(cookieParser());
app.use("/", claimRouter);

connectDB()
.then(()=>{
    console.log("Database connection established..");
    app.listen(8001,()=>{
       console.log("Server listening on port 8001"); 
    }) 
})
.catch((err)=>{
     console.log("Database cannot be connected..", err);

})