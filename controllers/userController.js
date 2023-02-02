const userModel = require('../models/userModel');

async function getTeam(req, res) {
    try {
        const { email } = req.body;
        const user = await userModel.findOne({ email: email });
        // console.log(user)
        return res.json({
            successfull: true,
            data : user["team"]
        })
    } catch (err) {
        console.log(err);
    }
}

async function addTeam(req, res) { 
    try {
        console.log("add")
        const { team , email} = req.body;
        const user = await userModel.findOne({ email: email });
        // console.log(req.body);
        user.team.push(req.body);
        await user.save();
        // const objj = { ...user }
        // console.log("team",objj["_doc"])
        res.json({
            successfull: true,
            message : "team added successfully !",
            data : user
        })  
    } catch (err) {
        console.log(err);
    }
}

async function deleteTeam(req, res) { 
    try {
        const {team,email} = req.body;
        const user = await userModel.findOneAndUpdate({ email: email }, {team: team})
        if (user){
            res.json({
                successful: true,
                message : "team deleted successfully",
            })
        }
        else{
            res.json({
                successful: false,
                message: 'Team not found!'
            })
        }
    } catch (err) {
        console.log(err);
    }
}
 
module.exports = {
    addTeam,
    getTeam,
    deleteTeam
} 