const express = require("express");
const router = express.Router();
const {
  createListing,
  getAllListings,
} = require("../controllers/listingController");
const { requireSignin } = require("../middleware/auth");
const validateWith = require("../middleware/validation");
const Joi = require("joi");
const upload = require("../middleware/upload");

const schema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow(""),
  price: Joi.number().required().min(1),
  categoryId: Joi.string().required(),
  location: Joi.object({
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
  }).optional(),
});

router.post("/", [upload, validateWith(schema)], createListing);
router.get("/", [], getAllListings);

module.exports = router;
