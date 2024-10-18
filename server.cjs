// for creating our server
const express = require("express");
// storing express method
const app = express();
// storing the port for the server
const PORT = process.env.PORT || 2200;
// for connecting our mongodb
const mongoose = require("mongoose");
// for initializing passport as middleware
const passport = require("passport");
const path = require("path");

const mongodb_password = encodeURIComponent(process.env.MONGODB_PASSWORD);

mongoose.connect(
  `mongodb+srv://${process.env.MONGODB_USERNAME}:${mongodb_password}@${process.env.SERVERLESS_INSTANCE}`
);

// middleware
app.use(express.static(path.join(__dirname, "/dist")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());

// importing our User Controller routes
const UserController = require("./controllers/UserController.cjs");
app.use("/user", UserController);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "/dist/index.html"));
});

// initializing our server
app.listen(PORT, () => console.log("listening on port: ", PORT));
