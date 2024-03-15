const Listing = require("../models/listing");

exports.createListing = (req, res) => {
  req.body.user = req.auth._id;
  req.body.location = JSON.parse(req.body.location);
  const newListing = new Listing(req.body);
  newListing
    .save()
    .then((listing) => {
      listing.images = undefined;
      res.send(listing);
    })
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

exports.listingById = (req, res, next, listingId) => {
  Listing.findById(listingId)
    .populate(["category", "user"])
    .then((listing) => {
      if (!listing)
        return res.status(404).json({
          erreur: "Listing not found",
        });
      req.listing = listing;
      next();
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.listingImage = (req, res) => {
  const { data, contentType } = req.listing.images[req.params.index];
  if (data) {
    res.set("Content-Type", contentType);
    return res.send(data);
  }
};
