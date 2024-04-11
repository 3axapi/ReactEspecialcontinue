const express = require("express");
const cors = require("cors");
const conenctionToMongoDB = require("./config/database");
const UserRouters = require("./routes/users");

const app = express();

app.use(cors());
app.use(express.json());
app.use("api/users", UserRouters);

const myDataBase = "myDB";
const url = `mongodb://localhost:27017/${myDataBase}`;
conenctionToMongoDB(url);

module.exports = app;