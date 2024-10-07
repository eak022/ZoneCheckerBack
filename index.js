const express = require("express");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 5000;
const frontend_url = process.env.FRONTEND_URL;

const stores = require("./store");

const app = express();

const corsOption = {
  origin: frontend_url,
};

app.use(cors(corsOption));

app.get("/api/stores", (req, res) => {
  res.json(stores);
});

app.get("/", (req, res) => {
  res.send("<h1>Welcome to API for Store Delivery Zone Checker</h1>");
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
