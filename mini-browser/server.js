const bodyParser = require("body-parser");
const express = require("express");
const app = express();

app.use(bodyParser.json());

app.post("/", (req, res) => {
  console.log(req.body);
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});

//Run app, then load http://localhost:3000 in a browser to see the output.
