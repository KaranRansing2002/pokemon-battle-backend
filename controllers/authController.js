const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')
const jwt_key = require('../secret');
const bcrypt = require('bcrypt')

async function signup(req, res) {
    try {        
        let data = req.body;
        const hash = await bcrypt.hash(data.password, 10);
        data.password=hash
        const user = await userModel.create(data);
        if (user) {
            return res.json({
                successfull: true,
                message: "user has signed up",
                data : user
            })
        } 
        else {
            console.log("sdknf")
            return res.json({
                successfull: false, 
                message: "error while signing up",
            })
        }

    } catch (err) {
        // console.log(err);
        console.log("here",err)
        return res.json({
            successfull : false,
            message : err
        })
    }
}

async function signin(req, res) {
    try {
        const { email, password } = req.body;
        const user = email.includes(".com") ? await userModel.findOne({ email: email }) : await userModel.findOne({username : email});
            // console.log("user not found")
        if (!user) {
            return res.status(404).json({
                successfull: false,
                message: "email not found",
            })
        }
        else {
            console.log("user here")
            // console.log(password,user.password)
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                const uid = user['_id'];
                const token = jwt.sign({ payload: uid }, jwt_key);
                res.cookie('login', token, { maxAge : 3600*1000*24*7, httpOnly: true,secure : false ,sameSite : 'lax'})
                let obj = {};
                obj.username = user.username;
                obj.team = user.team;
                
                // console.log("obj",obj.password) 
                return res.json({
                    successfull: true,
                    message: `successfully signed in , welcome ${user.username}`,
                    data: obj,
                })
            }
            else {
                return res.json({
                    successfull: false,
                    message: "wrong credentials",
                    data : ""
                })
            }
        }
    } catch (err) {
        console.log("slkdf");
        res.json({
            successfull: false,
            message: "error ",
        })
    }
}

async function protectRoute(req, res, next) {
    try {
        console.log("cookies",req.cookies)
        let token;
        if (req.cookies.login) {
            token=req.cookies.login
            let payload=jwt.verify(token,jwt_key)
            if(!payload){
                return res.json({
                    message : "user not verified",
                })
            }
            const user=await userModel.findById(payload.payload);
            req.body.email = user.email;  
            // console.log("protectRoute",req.email,req.body)
            next(); 
            
        }else{
            //browser
            const client=req.get('User-Agent');
            if(client.includes("Mozilla")){
                // return res.redirect('user/signin');
            }
            //postman
            return res.json({
                message : "please login"
            })  
        }
    } catch (err) {
        console.log("error")
        return res.json({
            message : err.message,
        })
    }
}
async function logout(req, res) {
    try { 
        console.log(req.cookies.login)
        res.clearCookie('login',{ httpOnly: true, sameSite: "strict", secure: true });
        res.json({
            successfull: true,
            message : "user logged out",
        })
    } catch (err) {
        res.json({
            successfull: false, 
            message : err
        })
    }
}
module.exports = {
    signin,
    signup,
    protectRoute,
    logout
}