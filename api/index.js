require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const BookRoutes = require("../Routes/BookRoutes.js");
const dbConnect = require("../db/dbConnect.js");

dbConnect();
const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "DELETE", "UPDATE", "PUT", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 200,
  })
);
app.use(express.json());
app.use("/api/v1/book", BookRoutes);

app.listen(process.env.PORT, () => console.log(`web server is online`));
