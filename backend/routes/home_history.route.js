const express = require('express');
const app = express();
const HomeHistoryRoute = express.Router();

// HomeHistory model
let HomeHistory = require('../models/HomeHistory');

// Get History by homeId
HomeHistoryRoute.route('/:id').get((req, res) => {
  HomeHistory.find({ 'homeId': req.params.id }, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


module.exports = HomeHistoryRoute;