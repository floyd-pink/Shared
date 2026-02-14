import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
     fullname:{
        type:String,
        required:true

    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phoneno:{
        type:Number,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
      address: [
    {
      fullName: String,
      phone: String,
      city: String,
      district: String,
      province: String,
      postalCode: String,
      street: String
    }
  ]

    
},{timestamps:true});
export const user=mongoose.model("user",userSchema);