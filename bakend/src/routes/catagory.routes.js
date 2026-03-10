const express = require("express");
const { categoryAddController,categoryAllController, getCategory, updateCategory, deleteCategory } = require("../controller/catagory.controller");
const upload = require("../middleware/upload");

const router = express.Router();

router.post("/add",upload.single("image"), categoryAddController);

router.get("/all",categoryAllController)

router.get("/:id",getCategory)

router.put("/update/:id", upload.single("image"), updateCategory);

router.delete("/delete/:id",deleteCategory)

module.exports = router;
