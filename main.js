const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/users", require("./routes/users"));

app.listen(PORT, () =>
  console.log("The server is up and running on port " + PORT)
);
