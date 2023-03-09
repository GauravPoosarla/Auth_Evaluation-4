const express = require("express");
const authRouter = require("./src/routes/authRouter");
const cors = require("cors");
const app = express();
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.options("*", cors());
app.use(
  cors({
    origin: "*",
  })
);

app.use(authRouter);

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
