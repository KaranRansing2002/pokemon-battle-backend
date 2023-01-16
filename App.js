const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const cookieParser = require('cookie-parser');

const cors = require("cors");
const pokemonRouter = require("./routers/pokemonRouter");
const movesRouter = require("./routers/movesRouter");
const userRouter = require("./routers/userRouter");
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //
};
app.use(cors(corsOptions)); // Use this after the variable declaration

app.use(express.json());
app.use(cookieParser());
 
app.listen(8000, () => {
  console.log("Server started.");  
}); 

app.get("/", (req, res) => {
  res.json("Hello world");
});


app.use('/pokemon',pokemonRouter)
app.use('/moves', movesRouter)
app.use('/user',userRouter)



