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
        console.log(req.body);
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


 
module.exports = {
    addTeam,
    getTeam,
}