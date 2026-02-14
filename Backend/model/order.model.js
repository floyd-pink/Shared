import mongoose  from "mongoose";

const orderschema =new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    orderItems:[
        {
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Product"
            },
            name:String,
            image:String,
            quantity:Number,
            price:Number
        }
    ],
    shippingAddress:{
        fullName:String,
        phone:String,
        city:String,
        district:String,
        province:String,
        postalCode:String,
        street:String
    },
    payment:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",

    },
    itemsPrice:{
        type:Number,
        required:true
    },

    taxPrice:{
        type:Number,
        required:true
    },
    shippingPrice:{
        type:Number,
        required:true
    },
    totalPrice:{
        type:Number,
        required:true
    },
    isPaid:{
        type:Boolean,
        required:true
    },
    paidAt:{
        type:Date
    },
    isDelivered:{
        type:Boolean,
        required:true
    },
    deliveredAt:{
        type:Date
    },
    orderStatus:{
        type:String,
        enum:["Processing", "Shipped", "Delivered", "Cancelled"],
        default:"Processing"
    }
},{timestamps:true});
export const order=mongoose.model("order",orderschema);