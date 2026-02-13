import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register =async(req,res)=>{
   try {
    const {username,email,password,phonenumber}=req.body;
    if(!username || !email || !password || !phonenumber){
        res.status(400).json({
            message:"All fields are required",
            success:false
        });
    }
    const user = await user.findone({email});
    if(user){
        res.status(400).json({
            message:"User already exists",
            success:false
        })
    }
    const hashedpassword =await bcrypt.hash(password,10);
    const usercreate= await user.create({
        username,
        email,
        password:hashedpassword,
        phonenumber:phonenumber
    })
    res.status(201).json({
        message:"User created successfully",
        success:true,
        user:usercreate
    })

   } catch (error) {
    console.log(error);
   }
};

export const login =async(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password){
        res.status(400).json({
            message:"All fields are required",
            success:false
        })
    }
    let user = await user.findone({email});
    if(!user){
        res.status(400).json({
            message:"User not found",
            success:false

    });
   }
    const ismatch = await bcrypt.compare(password,user.password);
    if(!ismatch){
        res.status(400).json({
            message:"Invalid credentials",
            success:false
        });
    }
    const tokendata={
        userid:user._id
    }
    user={
        id:user._id,
        username:user.username,
        email:user.email,
        phonenumber:user.phonenumber
    }
    const token = await jwt.sign(tokendata,process.env.JWT,{expiresIn:"1d"});
    return res.status(200).cookie('token',token,{maxAge:7*24*60*60*1000,httpsonly:true,samesite:'strict'}).json({
         message:"Login successful",
         success:true,
         token:token,
         user:user
    })

}
export const logout =async(req,res)=>{
    res.status(200).cookie('token','',{maxAge:0}).json({
        message:"Logout successful",
        success:true
    });
}