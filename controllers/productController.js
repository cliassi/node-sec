const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
    const { name, price, description, stock } = req.body;

    try {
        const product = new Product({ name, price, description, stock });
        await product.save();
        res.json(product);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};
