var express = require("express");
var cors = require("cors");
var dotenv = require("dotenv");

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
var bodyParser = require("body-parser");

dotenv.config();
dotenv.config({ path: `.env`, override: true });

const configPath = "./config.json";
const config = require(configPath);

const port = normalizePort(process.env.PORT || config.port || "4000");
const envVersion = process.env.ENV_VERSION || "UNKNOWN";

const clientId = process.env.CLIENT_ID || "UNKNOWN";
const clientSecret = process.env.CLIENT_SECRET || "UNKNOWN";

var app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send(`Yes? v5 / ${envVersion}`);
});

app.get("/token", async function (req, res) {
  const queryString =
    "?client_id=" +
    clientId +
    "&client_secret=" +
    clientSecret +
    "&code=" +
    req.query.code;

  var response = await fetch(
    "https://github.com/login/oauth/access_token" + queryString,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    }
  );
  var data = await response.json();
  res.json(data);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}
