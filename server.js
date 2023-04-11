const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { loginPage } = require("./controllers/UserControllers");

require("dotenv").config({ path: path.join(__dirname, "./.env") });
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/public", express.static(path.join(__dirname, "/public")));

app.use("/user", require("./routes/UserRoutes"));

module.exports = app;
