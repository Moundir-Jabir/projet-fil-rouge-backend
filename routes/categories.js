const express = require("express");
const router = express.Router();
const {
  createCategory,
  allCategories,
} = require("../controllers/categoryController");
const { requireSignin } = require("../middleware/auth");

router.get("/", [requireSignin], allCategories);

module.exports = router;
