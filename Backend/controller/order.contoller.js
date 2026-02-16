import { order as Order } from "../model/order.model.js";

export const createOrder = async (req, res) => {
  try {
    const { orderItems, shippingAddress, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;

    if (!orderItems || !Array.isArray(orderItems) || orderItems.length === 0) {
      return res.status(400).json({
        message: "orderItems are required",
        success: false,
      });
    }

    const newOrder = await Order.create({
      user: req.id,
      orderItems,
      shippingAddress,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      isPaid: false,
      isDelivered: false,
    });

    return res.status(201).json({
      message: "Order created successfully",
      order: newOrder,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const allOrders = await Order.find({ user: req.id }).populate("payment");
    return res.status(200).json({
      message: "All orders fetched successfully",
      orders: allOrders,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const foundOrder = await Order.findById(id).populate("payment");
    if (!foundOrder) {
      return res.status(404).json({
        message: "Order not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Order fetched successfully",
      order: foundOrder,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

export const cancleOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const existingOrder = await Order.findById(id);
    if (!existingOrder) {
      return res.status(404).json({
        message: "Order not found",
        success: false,
      });
    }
    if (existingOrder.orderStatus === "Cancelled") {
      return res.status(400).json({
        message: "Order already cancelled",
        success: false,
      });
    }
    if (existingOrder.orderStatus === "Delivered") {
      return res.status(400).json({
        message: "Delivered orders cannot be cancelled",
        success: false,
      });
    }

    existingOrder.orderStatus = "Cancelled";
    await existingOrder.save();

    return res.status(200).json({
      message: "Order cancelled successfully",
      order: existingOrder,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};
