const User = require("../models/user");

exports.userById = (req, res, next, id) => {
  User.findById(id)
    .then((user) => {
      if (!user)
        return res.status(404).json({
          erreur: "user not found",
        });
      req.user = user;
      next();
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.userImage = (req, res) => {
  const { data, contentType } = req.user.image;
  if (data) {
    res.set("Content-Type", contentType);
    return res.send(data);
  }
};
