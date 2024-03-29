const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const { DBURL } = require("./config");
const PORT = 3000;
const app = express();
//functions 
const databaseConnect = ()=>{
    const dbUrl = DBURL;
    try {
        mongoose.connect(dbUrl)
        console.log("connected to the database");
    }catch(err){
        console.log(err);
    }
}
//middleware
app.use(express.json());
//routes
app.use(authRoutes);

//db connection
databaseConnect();
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

