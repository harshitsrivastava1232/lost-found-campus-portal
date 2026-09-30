const express = require("express");
const router = express.Router();
const {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
  getStats,
} = require("../controllers/itemController");

router.get("/stats/summary", getStats);

router.route("/").get(getItems).post(createItem);

router.route("/:id").get(getItemById).put(updateItem).delete(deleteItem);

module.exports = router;
