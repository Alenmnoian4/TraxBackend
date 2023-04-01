// Dependencies 
require("dotenv").config();
const { PORT = 3000, DATABASE_URL } = process.env;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");

// Database Connection
mongoose.connect(DATABASE_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

mongoose.connection
    .on("open", () => console.log("You are connected to mongoose"))
    .on("close", () => console.log("You are disconnected to mongoose"))
    .on("error", () => console.log(error));

// schema
const TraxSchema = new mongoose.Schema({
  name: String,  
  meal: String,
  workout: String,
  weight: Number,
  notes: String
});

const Trax = mongoose.model("Trax", TraxSchema);

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
    res.send("Welcome to the Coffee App");
});

// Index Route
app.get("/trax", async (req, res) => {
    res.json(await Trax.find({}));
});

// Create Route
app.post("/trax", async (req, res) => {
    res.json(await Trax.create(req.body));
});

// Update Route
app.put("/trax/:id", async (req, res) => {
    res.json(await Trax.findByIdAndUpdate(req.params.id, req.body))
});

// Delete Route
app.delete("/trax/:id", async (req, res) => {
    res.json(await Trax.findByIdAndRemove(req.params.id));
})

// Show Route
app.get("/trax/:id", async (req, res) => {
    res.json(await Trax.findById(req.params.id));
});


app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`))






