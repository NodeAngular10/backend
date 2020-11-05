const express = require("express");
const bodyParser = require("body-parser");
var cors = require('cors')
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
require("./app/routes/customer.routes.js")(app);
require("./app/routes/product.routes.js")(app);

app.get("/", (req, res) => {
  //res.sendStatus(200)
   res.json({"message":"Welcome"});;
});

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
