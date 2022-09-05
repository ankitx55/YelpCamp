const express = require("express");
const app = express();

// const mongoose = require(mongoose);

const path = require("path");

app.set("viwe engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
   res.send("listening on port 3000");
});
app.get("/", (req, res) => {
   res.render("home");
});

app.listen(3000, () => {
   console.log("listening on port 3000");
});
