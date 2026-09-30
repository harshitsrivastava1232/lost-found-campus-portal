const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Electronics",
        "Documents",
        "Accessories",
        "Books",
        "Clothing",
        "ID Card",
        "Keys",
        "Bottles & Bags",
        "Other",
      ],
      default: "Other",
    },
    status: {
      type: String,
      enum: ["lost", "found"],
      required: true,
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    imageUrl: {
      type: String,
      default: "",
    },
    contactName: {
      type: String,
      required: [true, "Contact name is required"],
      trim: true,
    },
    contactEmail: {
      type: String,
      required: [true, "Contact email is required"],
      trim: true,
      lowercase: true,
    },
    contactPhone: {
      type: String,
      trim: true,
      default: "",
    },
    isResolved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Text index so search can hit title, description, and location together
itemSchema.index({ title: "text", description: "text", location: "text" });

module.exports = mongoose.model("Item", itemSchema);
