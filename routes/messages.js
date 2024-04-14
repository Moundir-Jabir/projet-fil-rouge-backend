const express = require("express");
const router = express.Router();
const { createMessage } = require("../controllers/messageController");
const { requireSignin } = require("../middleware/auth");
const validateWith = require("../middleware/validation");
const Joi = require("joi");

const schema = Joi.object({
  message: Joi.string().required(),
  sellerId: Joi.string().required(),
});

router.post(
  "/:listingId",
  [requireSignin, validateWith(schema)],
  createMessage
);

module.exports = router;
