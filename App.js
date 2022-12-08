const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions)); // Use this after the variable declaration

const pokemonModel = require("./models/pokemonModel");

app.use(express.json());

app.listen(8000, () => {
  console.log("Server started.");
});

app.get("/", (req, res) => {
  res.json("Hello world");
});

app.post("/pokemon/add", async (req, res) => {
  try {
    const data = req.body;
    const pokemon = await pokemonModel.create(data);
    res.json({
      message: pokemon,
    });
    const id = await pokemonModel.find({'id' : 0});
    console.log(id);
  } catch (err) {
    console.log(err);
  }
});

app.get('/pokemon/all', async (req, res) => {
  try {
    const data = await pokemonModel.find();
    res.json(data)
  } catch (error) {
    console.log(err)
  }
})



