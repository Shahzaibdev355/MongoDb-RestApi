const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");

const routes = require("./routes"); // Import the routes


const app = express();

const port = process.env.PORT || 5000; // Use the port from .env, default to 3000 if not set

app.use(cors());
app.use(bodyParser.json());


app.get("/test", async (req, res) => {
  res.json({ message: "backend is running" });
});



// Use the API routes from routes.js
app.use("/", routes);

app.listen(port, () => console.log("Server running on port 5000"));