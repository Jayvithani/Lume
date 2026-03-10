const express = require("express");
const upload = require ("../middleware/upload");
const { addClothes, getClothes,getClothesId,updateClothes,deletClothes } = require("../controller/clothes.controller");
const router = express.Router();
const auth = require("../middleware/auth");
const { isAdmin } = require("../middleware/isAdmin");

router.post("/add",auth,isAdmin,upload.array("images",5),addClothes)

router.get("/all",getClothes)

router.get("/all/:id",getClothesId)

router.put("/update/:id", upload.array("images",5),updateClothes)

router.delete("/delete/:id",deletClothes)

module.exports = router