const user = require('../model/user');
const jwt = require("jsonwebtoken");
const { JWTSECRET } = require("../config")

const errorHandler = (err)=>{
    let errors = {email:'',password:''};

    //duplicate email error
    if(err.code==11000){
        errors.email = "that email is already taken";
        return errors;
    }

    //validating errors 
    if(err.message.includes('validatoin failed')){
        Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path]= properties.message;
        })
    }

    return errors;
}

// jwt expire time that is 3 days 
const maxSize = 3*60*60*24;
//jsonwebtoken
const createToken = (id) =>{
    return jwt.sign({id},JWTSECRET,{
        expiresIn:maxSize,
    });
}


//controller actions 
module.exports = {
    signup_get : (req,res)=>{
        res.send("signup_page");
    },
    signup_post : async (req,res)=>{
        const {email,password} = req.body;
        
        try {
            const newUser = await user.create({email,password});
            const token = createToken(newUser._id);
            res.cookie('jwt',token,{httpOnly:true,maxAge:maxSize*1000});
            res.status(201).json({user:user._id});
        } catch (err) {
            const errors = errorHandler(err);
            res.status(400).json({errors});
        }

    },login_get : (req,res)=>{
        res.send("login_get_page");
    },login_post : async (req,res)=>{
        const {email,password} = req.body;
        res.send("login_get_page");
    }

}