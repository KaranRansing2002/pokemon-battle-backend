const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();

const cors = require("cors");
const pokemonRouter = require("./routers/pokemonRouter");
const movesRouter = require("./routers/movesRouter");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions)); // Use this after the variable declaration

app.use(express.json());

app.listen(8000, () => {
  console.log("Server started.");
});

app.get("/", (req, res) => {
  res.json("Hello world");
});


app.use('/pokemon',pokemonRouter)

app.use('/moves', movesRouter)



