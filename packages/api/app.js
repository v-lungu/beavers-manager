require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const db = require("./queries");

const app = express();

const port = 3001;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
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
app.get("/beavers/:id", db.getBeaver);
app.post("/beavers", db.createBeaver);
app.get("/guardians", db.getGuardian);
app.delete("/guardians/:email", db.deleteGuardian);
app.put("/beavers/:id", db.editBeaver);
app.get("/grade-statistics", db.getGradeStatistics);
app.get("/overworked-guardians", db.getOverworkedGuardians);
app.get("/eager-beaver-guardians", db.getGuardiansWithEagerBeavers);

app.listen(port, () => {
  console.log(`Beaver Scouts listening on port ${port} `);
});
