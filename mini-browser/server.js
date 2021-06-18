const bodyParser = require("body-parser");
const express = require("express");
const app = express();

app.use(bodyParser.json());

app.post("/", (req, res) => {
  console.log(req.body);
  res.write("Hello World!");
  res.write("你好 世界!");
  res.end();
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});

//Run app, then load http://localhost:3000 in a browser to see the output.
