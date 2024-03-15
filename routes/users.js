const express = require("express");
const router = express.Router();
const { userById, userImage } = require("../controllers/userController");

router.get("/image/:id", userImage);

router.param("id", userById);

module.exports = router;
