const db = require('../models'); 
const Store = db.Store;

// Create a new Store
exports.create = async (req, res) => {
    const { name, address, latitude, longitude } = req.body;
    if (!name || !address || !latitude || !longitude) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    try {
        const store = await Store.create(req.body);
        res.status(201).json(store);
    } catch (error) {
        console.error('Error creating store:', error); // เพิ่มการบันทึกข้อผิดพลาด
        res.status(500).json({ message: 'Error creating store', error: error.message });
    }
};

// Retrieve all Stores
exports.findAll = async (req, res) => {
    try {
        const stores = await Store.findAll();
        res.status(200).json(stores);
    } catch (error) {
        console.error('Error retrieving stores:', error);
        res.status(500).json({ message: 'Error retrieving stores', error: error.message });
    }
};

// Retrieve a single Store by ID
exports.findOne = async (req, res) => {
    try {
        const store = await Store.findByPk(req.params.id);
        if (!store) {
            return res.status(404).json({ message: 'Store not found' });
        }
        res.status(200).json(store);
    } catch (error) {
        console.error('Error retrieving store:', error);
        res.status(500).json({ message: 'Error retrieving store', error: error.message });
    }
};

// Update a Store by ID
exports.update = async (req, res) => {
    const { name, address, latitude, longitude } = req.body;
    if (!name || !address || !latitude || !longitude) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    try {
        const [updated] = await Store.update(req.body, {
            where: { id: req.params.id }
        });
        if (!updated) {
            return res.status(404).json({ message: 'Store not found' });
        }
        const updatedStore = await Store.findByPk(req.params.id);
        res.status(200).json(updatedStore);
    } catch (error) {
        console.error('Error updating store:', error);
        res.status(500).json({ message: 'Error updating store', error: error.message });
    }
};

// Delete a Store by ID
exports.delete = async (req, res) => {
    try {
        const deleted = await Store.destroy({
            where: { id: req.params.id }
        });
        if (!deleted) {
            return res.status(404).json({ message: 'Store not found' });
        }
        res.status(200).json({ message: 'Store deleted' });
    } catch (error) {
        console.error('Error deleting store:', error);
        res.status(500).json({ message: 'Error deleting store', error: error.message });
    }
};
