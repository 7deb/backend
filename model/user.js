const mongoose = require('mongoose');
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema  = new mongoose.Schema({
    email:{
        type:String,
        required:[true,"please enter a email"],
        unique:true,
        lowercase:true,
        validate:[isEmail,"please enter a valid email"],
    },
    password:{
        type:String,
        required:[true,"please enter a password"],
        minlength:[6,"minimum password lenght is 6"],
        
    }
})

userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password,salt);
    next();
})

