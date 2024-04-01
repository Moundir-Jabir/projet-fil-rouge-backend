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

exports.setExpoPushToken = (req, res) => {
  User.findByIdAndUpdate(
    req.auth._id,
    { expoPushToken: req.body.token },
    { new: true }
  )
    .then((user) => {
      user.hashed_password = undefined;
      user.salt = undefined;
      user.image = undefined;
      res.send(user);
    })
    .catch((error) => res.status(400).json({ error }));
};
