const Listing = require("../models/listing");

exports.createListing = (req, res) => {
  req.body.user = req.auth._id;
  const newListing = new Listing(req.body);
  newListing
    .save()
    .then((listing) => res.json({ listing }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getAllListings = async (req, res) => {
  try {
    const listings = await Listing.find()
      .select("-images")
      .populate(["category", "user"]);
    return res.json(listings);
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
};
