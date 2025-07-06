// controllers/ServiceController.js
const Service = require('../models/Service');

Exports.createService = async (req, res) => {
  try {
    const { name, price } = req.body;
    const service = new Service({ name, price });
    await service.save();
    return res.status(201).json({ message: 'Service created successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

Exports.getServices = async (req, res) => {
  try {
    const services = await Service.find();
    return res.status(200).json(services);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};
