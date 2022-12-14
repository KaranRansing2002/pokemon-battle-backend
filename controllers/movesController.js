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
        console.log("error",err)
    }
}

async function getAllMoves(req,res) {
    try {
        const data = await movesModel.find();
        let ndata=[];
        let ids=[];
        for(let i=0;i<data.length;i++){
            if(ids.includes(data[i]["Id"])){
                continue;
            }
            ids.push(data[i]["Id"]);
            ndata.push(data[i]);
        }
        res.json(ndata);
    } catch (err) {
        console.log(err)
    }
}

module.exports={addMoves, getAllMoves}