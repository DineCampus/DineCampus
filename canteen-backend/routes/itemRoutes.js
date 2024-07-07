const express = require('express');
const router = express.Router();
const { Item } = require('../models');

// Get all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.findAll();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single item by ID
router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findByPk(req.params.id);
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new item
router.post('/', async (req, res) => {
  try {
    const newItem = await Item.create(req.body);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update an existing item
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Item.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedItem = await Item.findByPk(req.params.id);
      res.status(200).json(updatedItem);
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete an item
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Item.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
