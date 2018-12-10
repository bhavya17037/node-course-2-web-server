const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

var app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", hbs);
app.use(express.static(__dirname + "/public"));

// Creating a middleware to keep the log of when the server is queried, what type of http request it was,
// and path of the page queried
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  fs.appendFile("server.log", log + "\n", err => {
    if (err) {
      console.log("Error logging the server activity.");
    }
  });
  next();
});

app.use((req, res, next) => {
  res.render("mantainance.hbs", { mantainanceTitle: "Site not available" });
});

hbs.registerHelper("getCurrentYear", () => {
  return new Date().getFullYear();
});

hbs.registerHelper("screamIt", text => {
  return text.toUpperCase();
});

app.get("/", (req, res) => {
  res.render("home.hbs", {
    name: "Bhavya",
    pageTitle: "Home page",
    likes: ["Coding", "Chess", "Reading", "Football"]
  });
});

app.get("/about", (req, res) => {
  res.render("about.hbs", {
    pageTitle: "About page"
  });
});

app.listen(3000, () => {
  console.log("Node server is live!");
});
