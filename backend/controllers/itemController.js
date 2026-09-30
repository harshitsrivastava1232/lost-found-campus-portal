const Item = require("../models/Item");

// @desc    Get all items (supports search, category, status filters)
// @route   GET /api/items
const getItems = async (req, res) => {
  try {
    const { search, category, status, resolved } = req.query;
    const query = {};

    if (status && status !== "all") {
      query.status = status;
    }

    if (category && category !== "all") {
      query.category = category;
    }

    if (resolved === "true" || resolved === "false") {
      query.isResolved = resolved === "true";
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
      ];
    }

    const items = await Item.find(query).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: items.length, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single item by id
// @route   GET /api/items/:id
const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: "Item not found" });
    }
    res.status(200).json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create a new lost/found item post
// @route   POST /api/items
const createItem = async (req, res) => {
  try {
    const item = await Item.create(req.body);
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update an item (e.g. mark as resolved, edit details)
// @route   PUT /api/items/:id
const updateItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!item) {
      return res.status(404).json({ success: false, message: "Item not found" });
    }
    res.status(200).json({ success: true, data: item });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete an item
// @route   DELETE /api/items/:id
const deleteItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: "Item not found" });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get quick stats for the homepage (total lost / found / resolved)
// @route   GET /api/items/stats/summary
const getStats = async (req, res) => {
  try {
    const [lost, found, resolved, total] = await Promise.all([
      Item.countDocuments({ status: "lost", isResolved: false }),
      Item.countDocuments({ status: "found", isResolved: false }),
      Item.countDocuments({ isResolved: true }),
      Item.countDocuments({}),
    ]);
    res.status(200).json({ success: true, data: { lost, found, resolved, total } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
  getStats,
};
