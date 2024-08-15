const router = require("./src/routes/route");
const express = require("express");
const cors = require("cors");

const app = express();

app.use("/anime", router);
app.use(cors());

app.listen(8080, () => {
  console.log("Server is running on http://localhost:8080");
});
