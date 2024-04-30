const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;
mongoose.connect(URL, {});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDb Connection success!");
});

// Import the router for results
const resultRouter = require("./routes/results");

// Mount the results router under the "/results" path
app.use("/results", resultRouter);

const questionRouter = require("./routes/questions");
app.use("/questions", questionRouter);

app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
