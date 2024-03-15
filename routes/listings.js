const express = require("express");
const router = express.Router();
const {
  createListing,
  getAllListings,
  listingById,
  listingImage,
} = require("../controllers/listingController");
const { requireSignin } = require("../middleware/auth");
const validateWith = require("../middleware/validation");
const Joi = require("joi");
const upload = require("../middleware/upload");

const schema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow(""),
  price: Joi.number().required().min(1),
  category: Joi.string().optional().allow(null),
  location: Joi.string().optional(),
  images: Joi.array().required(),
});

router.post("/", [requireSignin, upload, validateWith(schema)], createListing);
router.get("/", [requireSignin], getAllListings);
router.get("/image/:listingId/:index", listingImage);

router.param("listingId", listingById);

module.exports = router;
