const DB = require("../models");
const UPLOAD_BASE_URL = process.env.UPLOAD_BASE_URL;

const categoryAddController = async (req, res) => {
  try {
    const { name, type } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Category name is required",
      });
    }

  const existingCategory = await DB.CATEGORY.findOne({
  name,
  type
});
if (existingCategory) {
  return res.status(409).json({
    message: "Category already exists for this type",
  });
}

const image = req.file ? `uploads/${req.file.filename}` : null;
    const category = await DB.CATEGORY.create({
      name,
      type,
      image,
    });

    return res.status(201).json({
      message: "Category added successfully",
      category,
    });
  } catch (error) {
    console.error("Category add error:", error);
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};


const categoryAllController = async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.max(parseInt(req.query.limit) || 10, 1);
    const skip = (page - 1) * limit;

    const filter = { isActive: true };

    const totalCategory = await DB.CATEGORY.countDocuments(filter);

    const categories = await DB.CATEGORY.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }); 

    return res.json({
      page,
      limit,
      total: totalCategory,
      totalPages: Math.ceil(totalCategory / limit),
      data: categories,
    });
  } catch (error) {
    console.error("Category fetch error:", error);
    return res.status(500).json({
      message: "Failed to fetch categories",
      error: error.message,
    });
  }
};

const getCategory = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        message: "Category id is required",
      });
    }
    const category = await DB.CATEGORY.findById(id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }
    return res.json({
      message: "Category fetched successfully",
      data: category,
    });
  } catch (error) {
    console.error("Get category error:", error);
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;

    let updateData = { ...req.body };

  if (req.file) {
  updateData.image = `uploads/${req.file.filename}`;
}
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        message: "No data provided to update",
      });
    }

    const category = await DB.CATEGORY.findByIdAndUpdate(
      id,
    updateData ,
      { new: true }
    );

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    return res.json({
      message: "Category updated successfully",
      data: category,
    });

  } catch (error) {
    console.error("Update category error:", error);
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: "Category id is required",
      });
    }

    const category = await DB.CATEGORY.findByIdAndDelete(id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    return res.json({
      message: "Category deleted successfully",
      data: category,
    });

  } catch (error) {
    console.error("Delete category error:", error);
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};



module.exports = {
  categoryAddController,
  categoryAllController,
  getCategory,
  updateCategory,
  deleteCategory
};
