import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import dbConnect from "./configs/db";
// importing routes
import authAPI from "./apis/auth";
import productAPI from "./apis/product";

dotenv.config(); // configure dotenv
const app = express(); // create express app
dbConnect(); // database connection

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads")); // making the uploads folder publicly accessible

app.use(`/api/${process.env.API_VERSION}/auth`, authAPI);
app.use(`/api/${process.env.API_VERSION}/product`, productAPI);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
