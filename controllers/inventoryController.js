const Inventory = require('../models/Inventory');

exports.updateInventory = async (req, res) => {
    const { quantity } = req.body;

    try {
        const inventory = await Inventory.findById(req.params.id);
        if (!inventory) {
            return res.status(404).json({ msg: 'Inventory not found' });
        }

        inventory.quantity = quantity;
        inventory.lastUpdated = Date.now();

        await inventory.save();
        res.json(inventory);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};
