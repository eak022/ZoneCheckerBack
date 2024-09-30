const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const forntend_Url = process.env.Frontend_URL
const stores = require("./store")

const corsOption = {
    origin: forntend_Url,
};

//use Middleware
app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded
    ({ extended: true }));


app.get("/api/stores/", (req, res) => {
    res.json(stores);
});

app.get("/", (req, res) => {
    res.send("<h1>Hello FinancialTracker API</h1>");
});



app.listen(PORT, () => {
    console.log("Listenig to http://localhost:" + PORT);
});