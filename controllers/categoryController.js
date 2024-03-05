const Categorie = require("../models/category");

exports.createCategory = (req, res) => {
  const category = new Categorie(req.body);
  category
    .save()
    .then((category) => res.json(category))
    .catch((error) => res.status(400).json({ error }));
};

exports.allCategories = async (req, res) => {
  try {
    const categories = await Categorie.find();
    return res.json({
      categories,
    });
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
};
