const mongoose=require("mongoose")

const categorySchema= new mongoose.Schema({
   name: {
    type: String,
    required: true,
    trim: true,    
  },

  image: {
    type: String,  
  },
  
  type: {
    type: String,
    enum: ["men", "women", "kids", "unisex"],
  },

  isActive: {
    type: Boolean,
    default: true,  
  },
})

const categoryModel = mongoose.model("category", categorySchema);
module.exports = categoryModel;