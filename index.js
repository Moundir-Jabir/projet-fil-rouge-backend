const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

//Routers
const categoryRouter = require("./routes/categories");
const authRouter = require("./routes/auth");
const listingRouter = require("./routes/listings");
const userRouter = require("./routes/users");
const messageRouter = require("./routes/messages");

const mongoose = require("mongoose");
mongoose
  .connect(process.env.DATABASE, {})
  .then(() => console.log("database connected"))
  .catch((e) => console.log("not connect to database", e));

app.use(express.json());
app.use(cors());

app.use("/api/category", categoryRouter);
app.use("/api/auth", authRouter);
app.use("/api/listings", listingRouter);
app.use("/api/user", userRouter);
app.use("/api/message", messageRouter);

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`app running on port ${port}`);
});

const io = require("socket.io")(server, {
  pingTimeout: 60000,
});

io.on("connection", (socket) => {
  console.log("connected to socket.io");
  socket.on("send message", (message) => {
    console.log(message);
  });
});
