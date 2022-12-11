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
    id : {
        type : Number,
        required : true
    },
    pokemon : {
        type : Array,
        required : true,
    },
    name : {
        type : String,
        required : true
    },
    type : {
        type : String,
        required : true
    },
    damage_class : {
        type : String,
        required : true
    },
    power : {
        type : Number,
        required : true
    },
    accuracy : {
        type : Number,
        required : true
    },
    short_effect : {
        type : String,
        required : true
    },
    effect_chance : {
        type : Number
    },
    pp : {
        type : Number,
        required : true
    }
})

const movesModel = mongoose.model('movesSchema',movesSchema)

module.exports = movesModel 
