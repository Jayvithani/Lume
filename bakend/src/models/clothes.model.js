const mongoose = require("mongoose")

const clothesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
    },

    price: {
      type: Number,
      required: true,
    },

    discountPrice: {
      type: Number,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      required: true,
    },
 
    type: {
      type: String,
      enum: ["MEN", "WOMEN", "KIDS", "UNISEX"],
      required: true,
    },

    sizes: [
      {
        type: String,
        enum: ["XS", "S", "M", "L", "XL", "XXL"],
      },
    ],

    colors: [
      {
        type: String,
      },
    ],

    images: [
      {
        type: String, 
      },
    ],

    stock: {
      type: Number,
      default: 0,
    },

    brand: {
      type: String,
    },

    material: {
      type: String,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
    
  },
  { timestamps: true }
);

const clothesModel = mongoose.model("clothes",clothesSchema);
module.exports = clothesModel