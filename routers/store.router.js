const express = require('express');
const router = express.Router();
const storeController = require('../controllers/store.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Create a new Store
router.post('/stores', authMiddleware.verifyToken, authMiddleware.isAdmin, storeController.create);

// Retrieve all Stores
router.get('/stores', storeController.findAll);

// Retrieve a single Store with id
router.get('/stores/:id', storeController.findOne);

// Update a Store with id
router.put('/stores/:id', authMiddleware.verifyToken, authMiddleware.isStoreAdmin, storeController.update);

// Delete a Store with id
router.delete('/stores/:id', authMiddleware.verifyToken, authMiddleware.isStoreAdmin, storeController.delete);

module.exports = router;
