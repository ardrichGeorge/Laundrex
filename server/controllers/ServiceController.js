import Service from '../models/Service.js'; // Adjust path if needed

const ServiceController = {
  // 🛠️ Create a new service
  async createService(req, res) {
    try {
      const service = new Service(req.body);
      await service.save();
      res.status(201).json(service);
    } catch (err) {
      console.error('Error creating service:', err.message);
      res.status(500).json({ error: 'Failed to create service' });
    }
  },

  // 📄 Get all services
  async getServices(req, res) {
    try {
      const services = await Service.find();
      res.json(services);
    } catch (err) {
      console.error('Error fetching services:', err.message);
      res.status(500).json({ error: 'Failed to fetch services' });
    }
  },

  // 🔍 Get a single service by ID
  async getServiceById(req, res) {
    try {
      const service = await Service.findById(req.params.id);
      if (!service) return res.status(404).json({ message: 'Service not found' });
      res.json(service);
    } catch (err) {
      console.error('Error fetching service:', err.message);
      res.status(500).json({ error: 'Failed to retrieve service' });
    }
  },

  // ✏️ Update a service
  async updateService(req, res) {
    try {
      const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });
      if (!service) return res.status(404).json({ message: 'Service not found' });
      res.json(service);
    } catch (err) {
      console.error('Error updating service:', err.message);
      res.status(500).json({ error: 'Failed to update service' });
    }
  },

  // ❌ Delete a service
  async deleteService(req, res) {
    try {
      const service = await Service.findByIdAndDelete(req.params.id);
      if (!service) return res.status(404).json({ message: 'Service not found' });
      res.json({ message: 'Service deleted' });
    } catch (err) {
      console.error('Error deleting service:', err.message);
      res.status(500).json({ error: 'Failed to delete service' });
    }
  }
};

export default ServiceController;
