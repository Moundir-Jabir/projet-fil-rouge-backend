const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.register = (req, res) => {
  req.body.image = req.body.images[0];
  const user = new User(req.body);
  user
    .save()
    .then((user) => {
      user.hashed_password = undefined;
      user.salt = undefined;
      user.image = undefined;
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
      return res.json({ token, user });
    })
    .catch((error) =>
      res
        .status(400)
        .json({ error: "A user with the given email already exists." })
    );
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (!user)
        return res.status(400).json({
          error: "Not found user with this email",
        });
      if (!user.authenticated(password))
        return res.status(401).json({
          error: "Incorect password",
        });
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
      user.hashed_password = undefined;
      user.salt = undefined;
      user.image = undefined;
      return res.json({ token, user });
    })
    .catch((error) => res.status(400).json({ error }));
};
