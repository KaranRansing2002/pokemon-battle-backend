const express = require('express');
const { signin, signup, protectRoute, logout } = require('../controllers/authController');
const { getTeam, addTeam } = require('../controllers/userController');
const userRouter = express.Router();

userRouter.route('/signin')
    .post(signin)

userRouter.route('/signup')
    .post(signup)

userRouter.route('/signout')
    .get(logout)

userRouter.route('/team')
    .get(protectRoute,getTeam)
    .post(protectRoute, addTeam)
    
module.exports = userRouter;