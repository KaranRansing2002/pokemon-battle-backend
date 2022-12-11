const movesModel = require('../models/movesModel')

async function addMoves(req,res){
    try {
        const data = req.body;
        const move = await movesModel.create(data);
        res.json({
            message : "move added successfully",
            data : move
        })
    } catch (err) {
        console.log(err)
    }
}

async function getAllMoves(req,res) {
    try {
        const data = await movesModel.find();
        res.json(data)
    } catch (error) {
        console.log(err)
    }
}

module.exports={addMoves, getAllMoves}