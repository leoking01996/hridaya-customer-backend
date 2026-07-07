require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/auth");

const app = express();

const PORT = process.env.PORT || 5000;


// ===============================
// CORS ALLOW ALL
// ===============================

app.use(
  cors({
    origin: true,
    credentials: true,
    methods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
      "OPTIONS"
    ],
    allowedHeaders: [
      "Content-Type",
      "Authorization"
    ]
  })
);


// IMPORTANT FOR PREFLIGHT
app.options("*", cors());


// ===============================
// BODY PARSER
// ===============================

app.use(express.json({
  limit:"10mb"
}));

app.use(express.urlencoded({
  extended:true,
  limit:"10mb"
}));



// ===============================
// LOGGER
// ===============================

app.use((req,res,next)=>{

 console.log(
   "REQUEST:",
   req.method,
   req.originalUrl
 );

 console.log(
   "ORIGIN:",
   req.headers.origin
 );

 next();

});



// ===============================
// UPLOADS
// ===============================

app.use(
 "/uploads",
 express.static(
   path.join(__dirname,"uploads")
 )
);



// ===============================
// ROUTES
// ===============================

app.use(
 "/api/auth",
 authRoutes
);



app.get("/",(req,res)=>{

 res.json({
   success:true,
   message:"Hridaya Customer Backend is Running 🚀"
 });

});



// ===============================
// DATABASE
// ===============================


mongoose.connect(process.env.MONGO_URI)
.then(()=>{

 console.log("MongoDB Connected");


 app.listen(PORT,()=>{

  console.log(
   `Server running on ${PORT}`
  );

 });


})
.catch(err=>{

 console.log(
  "Mongo Error:",
  err.message
 );

});