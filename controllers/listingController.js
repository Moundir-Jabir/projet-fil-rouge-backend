const Listing = require("../models/listing");

exports.createListing = (req, res) => {
  req.body.user = req.auth._id;
  req.body.location = JSON.parse(req.body.location);
  req.body.nbrimages = req.body.images.length;
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
    const listings = await Listing.find(req.query).select("-images");
    return res.json(listings);
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
};

exports.getListingById = (req, res) => {
  return res.send({
    listing: req.listing,
    numberOfListing: req.numberOfListing,
  });
};

exports.listingById = (req, res, next, listingId) => {
  Listing.findById(listingId)
    .select("-images")
    .populate(["category", { path: "user", select: "-image" }])
    .then((listing) => {
      if (!listing)
        return res.status(404).json({
          erreur: "Listing not found",
        });
      Listing.find({ user: listing.user })
        .countDocuments()
        .then((count) => {
          req.listing = listing;
          req.numberOfListing = count;
          next();
        });
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.listingImage = (req, res) => {
  Listing.findById(req.params.listingId)
    .slice("images", [Number(req.params.index), 1])
    .then((listing) => {
      if (!listing)
        return res.status(404).json({
          erreur: "Listing not found",
        });
      const { data, contentType } = listing.images[0];
      if (data) {
        res.set("Content-Type", contentType);
        return res.send(data);
      }
    })
    .catch((error) => res.status(400).json({ error }));
};
