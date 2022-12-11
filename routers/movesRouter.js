const express = require('express');
const { getAllMoves, addMoves } = require('../controllers/movesController');
const movesRouter = express.Router();

movesRouter.route('/all')
    .get(getAllMoves)

movesRouter.route('/')
    .post(addMoves)

module.exports=movesRouter