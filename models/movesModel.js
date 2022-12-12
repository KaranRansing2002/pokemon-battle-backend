const mongoose = require("mongoose");

const dblink =
  "mongodb+srv://Strange007:CGPcJe8SeHIFj9jI@cluster0.elmuzpg.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(dblink)
  .then(() => {
    console.log("moves DB connected.");
  })
  .catch((err) => {
    console.log("Error", err);
  });

const movesSchema = mongoose.Schema({
    Id : {
        type : Number,
        required : true,
        unique : true
    },
    Pokemon : {
        type : Array,
        required : true,
    },
    Name : {
        type : String,
        required : true,
        unique : true 
    },
    Type : {
        type : String,
        required : true
    },
    Category : {
        type : String,
        required : true
    },
    Power : {
        type : Number,
        required : true
    },
    Accuracy : {
        type : Number,
        required : true
    },
    Effect : {
        type : String,
    },
    TM : {
        type : Number
    },
    PP : {
        type : Number,
        required : true
    },
    Prob : {
        type : Number,
    }
})

const movesModel = mongoose.model('movesSchema',movesSchema)

module.exports = movesModel 
