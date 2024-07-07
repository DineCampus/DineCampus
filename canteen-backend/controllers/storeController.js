const { Store, Item } = require('../models');

// Get all stores
const getStores = async (req, res) => {
  try {
    const stores = await Store.findAll({ include: ['items'] });
    res.status(200).json(stores);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a specific store by ID
const getStoreById = async (req, res) => {
  const { id } = req.params;
  try {
    const store = await Store.findByPk(id, { include: ['items'] });
    if (store) {
      res.status(200).json(store);
    } else {
      res.status(404).json({ message: 'Store not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new store
const createStore = async (req, res) => {
  const { name, icon } = req.body;
  try {
    const store = await Store.create({ name, icon });
    res.status(201).json(store);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a store
const updateStore = async (req, res) => {
  const { id } = req.params;
  const { name, icon } = req.body;
  try {
    const store = await Store.findByPk(id);
    if (store) {
      store.name = name;
      store.icon = icon;
      await store.save();
      res.status(200).json(store);
    } else {
      res.status(404).json({ message: 'Store not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a store
const deleteStore = async (req, res) => {
  const { id } = req.params;
  try {
    const store = await Store.findByPk(id);
    if (store) {
      await store.destroy();
      res.status(200).json({ message: 'Store deleted' });
    } else {
      res.status(404).json({ message: 'Store not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getStores,
  getStoreById,
  createStore,
  updateStore,
  deleteStore,
};
