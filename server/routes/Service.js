import express from 'express';
import ServiceController from '../controllers/ServiceController.js';

const router = express.Router();

// 🛠️ Create a new service
router.post('/', ServiceController.createService);

// 📄 Get all services
router.get('/', ServiceController.getServices);

// 🔍 Get a specific service by ID
router.get('/:id', ServiceController.getServiceById);

// ✏️ Update a service
router.put('/:id', ServiceController.updateService);

// ❌ Delete a service
router.delete('/:id', ServiceController.deleteService);

export default router;
