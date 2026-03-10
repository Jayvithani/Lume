const DB = require("../models");
const UPLOAD_BASE_URL = process.env.UPLOAD_BASE_URL;

const addClothes = async (req, res) => {
  try {
    const {
      name,
      price,
      category,
      type,
      sizes,
      colors,
      stock,
      description,
    } = req.body;

    if (!name || !price || !category || !type) {
      return res.status(400).json({
        message: "Required fields missing",
      });
    }

    let images = [];
  if (req.files && req.files.length > 0) {
  images = req.files.map((file) => `uploads/${file.filename}`);
}
    const product = await DB.CLOTHES.create({
      name,
      description,
      price,
      category,
      type,
      sizes: sizes ? JSON.parse(sizes) : [],
      colors: colors ? JSON.parse(colors) : [],
      stock,
      images,
    });

    return res.status(201).json({
      message: "Clothes added successfully",
      data: product,
    });
  } catch (error) {
    console.error("Add clothes error:", error);
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const getClothes = async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.max(parseInt(req.query.limit) || 10, 1);
    const skip = (page - 1) * limit;

    const totalProducts = await DB.CLOTHES.countDocuments({ isActive: true });

    const products = await DB.CLOTHES.find({ isActive: true })
      .populate("category", "name type")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    return res.json({
      page,
      limit,
      total: totalProducts,
      totalPages: Math.ceil(totalProducts / limit),
      data: products,
    });
  } catch (error) {
    console.error("Get clothes error:", error);
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const getClothesId = async(req,res) =>{
       try {
        const {id} = req.params;
        if(!id){
         return res.status(400).json({
            message:"clothes id is required"
         })
        }
        const clothes = await DB.CLOTHES.findById(id);
        if(!clothes){
          return res.status(404).json({
            message:"clothes not found"
          })
        }
        return res.json({
            message:"clothes fetched sucessfully",
            data:clothes
        })
       } catch (error) {
          console.error("Get clothes error:", error);
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
}

const updateClothes = async (req,res) => {
   try {
    const {id} = req.params;
    let updateData = {...req.body};
    
    if (req.file) {
      updateData.image = req.file.filename; 
    }
     if(!id){
         return res.status(400).json({
            message:"clothes id is required"
         })
        }
        const clothes = await DB.CLOTHES.findByIdAndUpdate(
            id,
            updateData,
            {new:true}
        )
        if(!clothes){
          return res.status(400).json({
            message:"clothes not found"
          })
        }
        return res.json({
            message:"clothes updated succfully",
            data:clothes
        })
   } catch (error) {
      console.error("Update clothes error:", error);
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
   }
}

const deletClothes = async (req,res) =>{
    try {
        const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        message: "Clothes id is required",
      });
    }
     const clothes = await DB.CLOTHES.findByIdAndDelete(id)
     if(!clothes){
      return res.status(404).json({
        message:"clothes are not found"
      })
     }
     return res.json({
        message:"clothes deleted successfully",
        data:clothes
     })
    } catch (error) {
         console.error("Delete category error:", error);
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
    }
}

module.exports = { addClothes,getClothes,getClothesId,updateClothes,deletClothes };
