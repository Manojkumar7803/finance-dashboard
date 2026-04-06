const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/api/data", (req, res) => {
  res.json({
    income: 50000,
    expense: 20000,
    savings: 30000
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log("Server running on http://localhost:5000");
});