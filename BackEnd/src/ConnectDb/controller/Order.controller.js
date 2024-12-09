 import { order } from "../model/Order.model.js";

export const createOrder = async (req, res) => {
    try {
        const order = new order(req.body);
        await order.save();
        res.status(201).json({ message: 'Order placed successfully', order });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getOrdersByUserId = async (req, res) => {
    try {
        const orders = await order.find({ userId: req.params.userId }).populate('items.productId');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
