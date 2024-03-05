const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

//Routers
const categoryRouter = require("./routes/categories");
const authRouter = require("./routes/auth");
const listingRouter = require("./routes/listings");

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

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
