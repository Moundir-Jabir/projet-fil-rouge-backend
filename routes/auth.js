const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");
const validateWith = require("../middleware/validation");
const Joi = require("joi");

const registerSchema = Joi.object({
  name: Joi.string().required().min(3),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(5),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(5),
});

router.post("/register", [validateWith(registerSchema)], register);
router.post("/login", validateWith(loginSchema), login);

module.exports = router;
