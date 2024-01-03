var express = require("express");
var cors = require("cors");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
var bodyParser = require("body-parser");

require("dotenv").config();
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

var app = express();

app.use(cors());
app.use(bodyParser.json());
app.get("/getAccessToken", async function (req, res) {
  req.query.code;
  const params =
    "?client_id=" +
    client_id +
    "&client_secret=" +
    client_secret +
    "&code=" +
    req.query.code;

  await fetch("https://github.com/login/oauth/access_token" + params, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      res.json(data);
    });
});

app.get("/getUserData", async function (req, res) {
  req.get("Authorization");
  await fetch("https://api.github.com/user", {
    method: "GET",
    headers: {
      Authorization: req.get("Authorization"),
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      res.json(data);
    });
});

app.listen(4000);
