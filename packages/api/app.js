require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const db = require("./queries");

const app = express();

const port = 3001;

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

app.listen(port, () => {
  console.log(`Beaver Scouts listening on port ${port} `);
});
