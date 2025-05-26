import express from "express";
import { connect } from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./routes/index.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", router);

const startApp = async () => {
  try {
    if (!process.env.DB) {
      throw new Error(
        "Database connection string is not defined in the configuration."
      );
    }
    await connect(process.env.DB);
    console.log("Successfully connected to the Mongo database");

    app.listen(port, () => {
      console.log(`server is running on port ${port}`);
    });
  } catch (e) {
    console.log(e);
  }
};

startApp();
