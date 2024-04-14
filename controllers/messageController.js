const Message = require("../models/message");
const User = require("../models/user");
const sendPushNotification = require("../utilities/pushNotifications");

exports.createMessage = (req, res) => {
  const message = new Message({
    message: req.body.message,
    listing: req.params.listingId,
    user: req.auth._id,
  });
  message
    .save()
    .then(async (message) => {
      const seller = await User.findById(req.body.sellerId).select(
        "expoPushToken"
      );
      sendPushNotification(seller.expoPushToken, message.message);
      return res.send(message);
    })
    .catch((error) => res.status(400).json({ error }));
};
