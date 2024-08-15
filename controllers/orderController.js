const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
    const { product, quantity, totalAmount } = req.body;

    try {
        const order = new Order({
            product,
            user: req.user.id,
            quantity,
            totalAmount,
            status: 'pending'
        });

        await order.save();
        res.json(order);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id }).populate('product');
        res.json(orders);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};
