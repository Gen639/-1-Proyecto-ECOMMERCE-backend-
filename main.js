const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/users", require("./routes/users"));
app.use("/products", require("./routes/products"));
app.use("/categories", require("./routes/categories"));

app.listen(PORT, () =>
  console.log("The server is up and running on port " + PORT)
);
