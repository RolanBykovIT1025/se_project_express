const express = require("express");
const mongoose = require("mongoose");
const mainRouter = require("./routes/index");
const login = require("controllers/users");
const createUser = require("controllers/users");
const auth = require("./middlewares/auth");
const cors = require("cors");

app.use(cors());

const app = express();
const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);

app.use((req, res, next) => {
  req.user = { _id: "69588de78d7474beda0d8c53" };
  next();
});

app.use(express.json());
app.use("/", mainRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

app.post('/signin', login);
app.post('/signup', createUser);
