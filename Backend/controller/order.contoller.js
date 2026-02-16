import order from "../model/order.model.js";

export const createOrder = async (req, res) => {
    try{
    const{id}=req.params;
    const{userId,productId,quantity,totalPrice}=req.bpdy;
    const newOrder = await order.create({userId,productId,quantity,totalPrice});
    if(!newOrder){

        res.status(400).json({
            message:"order creation failed",
            sucess:false
        })
    }
    res.status(201).json({
        message:"order created successfully",
        order:newOrder,
        sucess:true
    })
}catch(error){
    res.status(500).json({
        message:"Internal server error",
        sucess:false
    })
}
}

export const getAllOrders = async (req, res) => {
    try {
        const allOrders = await order.find();
        res.status(200).json({
            message:"All orders fetched successfully",
            orders:allOrders,
            sucess:true
        })
    } catch (error) {
        res.status(500).json({
            message:"Internal server error",
            sucess:false
        })
    }
}
export const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const orderById = await order.findById(id);
        if (!orderById) {
            return res.status(404).json({
                message: "Order not found",
                sucess: false
            });
        }
        res.status(200).json({
            message: "Order fetched successfully",
            order: orderById,
            sucess: true
        });
    } catch (error) {
        res.status(500).json({
            message:"Internal server error",
            sucess:false
        })
    }
}

export const cancleOrder = async (req, res) => {
    try{
     const {id}=req.params;
     const existingOrder = await order.findById(id);
     if(!existingOrder){
        return res.status(404).json({
            message:"Order not found",
            sucess:false
        });
     }
     if(existingOrder.orderStatus === "Cancelled"){
        return res.status(400).json({
            message:"Order already cancelled",
            sucess:false
        });
     }
     if(existingOrder.orderStatus === "Delivered"){
        return res.status(400).json({
            message:"Delivered orders cannot be cancelled",
            sucess:false
        });
     }

     existingOrder.orderStatus = "Cancelled";
     await existingOrder.save();

     return res.status(200).json({
        message:"Order cancelled successfully",
        order:existingOrder,
        sucess:true
     });
    }
    catch(error){
        res.status(500).json({
            message:"Internal server error",
            sucess:false
        })
    }
}