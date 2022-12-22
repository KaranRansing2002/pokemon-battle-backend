const express = require('express');
const { getAllMoves, addMoves, moveDetails } = require('../controllers/movesController');
const movesRouter = express.Router();

movesRouter.route('/all')
    .get(getAllMoves)

movesRouter.route('/')
    .post(addMoves)

movesRouter.route('/:name')
    .get(moveDetails)

module.exports=movesRouter