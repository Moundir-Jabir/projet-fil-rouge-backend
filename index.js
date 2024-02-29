const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

//Routers

const mongoose = require("mongoose");
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
  })
  .then(() => console.log("database connected"))
  .catch((e) => console.log("not connect to database", e));

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
