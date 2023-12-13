const express = require("express");
const router = express.Router();
const {
    getAllCategory,addCategory
} = require("../controller/category.controller");



router.get("/get-all", getAllCategory);
router.post("/add", addCategory);

module.exports = router;
