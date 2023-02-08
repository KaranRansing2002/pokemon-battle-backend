const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const cookieParser = require('cookie-parser');
const cors = require("cors");
const pokemonRouter = require("./routers/pokemonRouter");
const movesRouter = require("./routers/movesRouter");
const userRouter = require("./routers/userRouter");
const http = require('http')
const {Server} = require("socket.io")

console.log("it is working !");

const corsOptions = {
  origin: "https://pokemon-battle-simulator-snowy.vercel.app/",
  credentials: true, //
};

app.use(cors(corsOptions)); // Use this after the variable declaration
app.use(express.json());
app.use(cookieParser());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://pokemon-battle-simulator-snowy.vercel.app/");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});
const server = app.listen(8000, () => {
  console.log("Server started.");  
}); 

const io = new Server(server, {
  cors: {
    origin: "*",
    methods : ['GET','POST','PATCH','DELETE']
  }
})

io.on("connection", (socket) => {
  // console.log("user connected", socket.id)
 
  socket.on("join_room", (data) => {
    console.log("room joined", data);
    socket.join(data);
  })
  
  socket.on("send_message", (data) => { 
    console.log(data);
    socket.to(data.roomid).emit("receive_message", data);
  })

  socket.on("pokemon", (data) => {
    console.log(data);
    socket.to(data.roomid).emit("opponent_pokemon",data)
  })

  socket.on("currhp", (data) => {
    socket.to(data.roomid).emit("opponent_hp", data);
  }) 

  socket.on("attack", (data) => {
    // console.log("here",data);
    socket.to(data.roomid).emit("opponent_attack", data);
  })

  // socket.on("disconnect", () => {
  //   console.log("User Disconnected", socket.id);
  // }) 

})



app.get("/", (req, res) => {
  res.json("Hello world sdfsfs");
});


app.use('/pokemon',pokemonRouter)
app.use('/moves', movesRouter)
app.use('/user',userRouter)



