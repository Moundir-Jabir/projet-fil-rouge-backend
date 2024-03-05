const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.register = (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then((user) => {
      user.hashed_password = undefined;
      user.salt = undefined;
      res.json(user);
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (!user)
        return res.status(400).json({
          erreur: "Not found user with this email",
        });
      if (!user.authenticated(password))
        return res.status(401).json({
          erreur: "Incorect password",
        });
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
      user.hashed_password = undefined;
      user.salt = undefined;
      return res.json({ token, user });
    })
    .catch((error) => res.status(400).json({ error }));
};
