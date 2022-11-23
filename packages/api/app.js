require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const db = require("./queries");

const app = express();

const port = 3001;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/beavers", db.getBeavers);
app.post("/beavers", db.createBeaver);
app.get("/guardians", db.getGuardian);

app.listen(port, () => {
  console.log(`Beaver Scouts listening on port ${port} `);
});
