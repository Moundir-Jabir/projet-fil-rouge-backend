const express = require("express");
const router = express.Router();
const {
  userById,
  userImage,
  setExpoPushToken,
} = require("../controllers/userController");
const { requireSignin } = require("../middleware/auth");
const validateWith = require("../middleware/validation");
const Joi = require("joi");

const schema = Joi.object({ token: Joi.string().required() });

router.get("/image/:id", userImage);
router.patch(
  "/expoPushToken",
  [requireSignin, validateWith(schema)],
  setExpoPushToken
);

router.param("id", userById);

module.exports = router;
