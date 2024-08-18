import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import dbConfigs from "./database/db.js";
import bodyParser from "body-parser";
import ProductRoute from "./routes/product.route.js";

// create app express
const app = express();

app.use(cors());

// bodyParser convert JSON request => js object
app.use(bodyParser.json());
// bodyParser convert data urlcencode of reqest => js object
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3001;

app.get("/health", (req, res) => {
  res.status(200).send("Server is healty");
});

app.use("/products", ProductRoute);

app.listen(PORT, () => {
  console.log(`server is running on port : ${PORT}`);
});

// connect mongo
mongoose.Promise = global.Promise;
mongoose.connect(dbConfigs.db).then(
  () => {
    console.log("Database successfully connected");
  },
  (error) => {
    console.log(`Database could not connect: ${error}`);
  }
);
