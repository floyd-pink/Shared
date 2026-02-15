import mongoose  from "mongoose";

const productschema =new mongoose.Schema({
    name:{
        type:String,
        required:true

    },
    description:{
        type:String,
        required:true
    },
    brand:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    discount:{
        type:Number,
    },
    instock:{
        type:Number,
        required:true
    },
    sold:{
        type:Number,
    },
    images:[{
        url:String,
        public_id:String
    }],
    category: {
    type: ObjectId,
    ref: "Category"
   },
     ratings:{
        type:Number,
     },
  reviews: [
    {
      user: { type: ObjectId, ref: "User" },
      name: String,
      rating: Number,
      comment: String
    }
  ]



},{timestamps:true})
export const product=mongoose.model("product",productschema);